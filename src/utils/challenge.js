import moment from "moment";
import "moment-duration-format";
import _ from "lodash";
import * as constants from "../constants";
import Joi from "joi";
import { initialChallengeFilter } from "../reducers/filter";

Joi.optionalId = () => Joi.string().uuid();
Joi.page = () => Joi.number().integer().min(1);
Joi.perPage = () =>
  Joi.number()
    .integer()
    .min(1)
    .max(100)
    .valid(...constants.PAGINATION_PER_PAGES);
Joi.bucket = () =>
  Joi.string().custom((param) =>
    constants.FILTER_BUCKETS.find(
      (bucket) => param && param.toLowerCase() === bucket.toLowerCase()
    )
  );
Joi.track = () =>
  Joi.string().custom((param) =>
    _.findKey(
      constants.FILTER_CHALLENGE_TRACK_ABBREVIATIONS,
      (trackAbbreviation) =>
        param && param.toLowerCase() === trackAbbreviation.toLowerCase()
    )
  );
Joi.type = () =>
  Joi.string().custom((param) =>
    _.findKey(
      constants.FILTER_CHALLENGE_TYPE_ABBREVIATIONS,
      (typeAbbreviation) =>
        param && param.toLowerCase() === typeAbbreviation.toLowerCase()
    )
  );

export function getCurrencySymbol(prizeSets) {
  return constants.CURRENCY_SYMBOL[_.get(prizeSets, "[0].prizes[0].type", "")];
}

export function getPlacementPrizes(prizeSets) {
  const placementSet =
    prizeSets && prizeSets.find((prizeSet) => prizeSet.type === "placement");
  return placementSet && placementSet.prizes
    ? placementSet.prizes.map((p) => p.value)
    : [];
}

export function getCheckpointPrizes(prizeSets) {
  const checkpointSet =
    prizeSets && prizeSets.find((prizeSet) => prizeSet.type === "checkpoint");
  return checkpointSet && checkpointSet.prizes
    ? checkpointSet.prizes.map((p) => p.value)
    : [];
}

/**
 * Convert the query of `/earn/find/challenges` path into the challenge filter.
 *
 * @param {Object} params The query params
 *
 * @return {Object} normalized challenge filter
 */
export function createChallengeFilter(params) {
  const schema = createChallengeFilter.schema;
  const normalized = Joi.attempt(
    params,
    schema,
    { abortEarly: false, stripUnknown: true },
    (err, value) => {
      let invalidAttributes = [];
      if (err) {
        invalidAttributes = err.details.reduce(
          (arr, detail) => arr.concat(detail.path.join(".")),
          []
        );
      }

      return _.omit(value, invalidAttributes);
    }
  );

  return _.omitBy(
    {
      page: normalized.page,
      perPage: normalized.perPage,
      types: normalized.types,
      tracks: normalized.tracks,
      search: normalized.search,
      tags: normalized.tags,
      startDateEnd:
        normalized.startDateEnd && normalized.startDateEnd.toISOString(),
      endDateStart:
        normalized.endDateStart && normalized.endDateStart.toISOString(),
      sortBy: normalized.sortBy,
      groups: normalized.groups,
      events: normalized.events,
      bucket: normalized.bucket,
      totalPrizesFrom: normalized.totalPrizesFrom,
      totalPrizesTo: normalized.totalPrizesTo,
      includeAllTags: normalized.includeAllTags,
      recommended: normalized.recommended,
    },
    (value) => value == null
  );
}

const queryScheme = {
  page: Joi.page(),
  perPage: Joi.perPage(),
  types: Joi.array().items(Joi.type()),
  tracks: Joi.array().items(Joi.track()),
  search: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  startDateEnd: Joi.date(),
  endDateStart: Joi.date(),
  sortBy: Joi.string().valid("updated", "overview.totalPrizes", "name"),
  groups: Joi.array().items(Joi.optionalId()).unique(),
  events: Joi.array().items(Joi.string()),
  bucket: Joi.bucket(),
  totalPrizesFrom: Joi.number().integer().min(0),
  totalPrizesTo: Joi.number().integer().min(0),
  includeAllTags: Joi.boolean(),
  recommended: Joi.boolean(),
};

/**
 * Define the validation scheme for `/earn/find/challenges` url query
 *
 * The scheme is used when the app is mounted with `/earn/find/challenges` request.
 */
createChallengeFilter.schema = Joi.object().keys(queryScheme).unknown(true);

/**
 * Return the query params corresponding to the filter
 *
 * @param {Object} filter The challenge filter
 *
 * @return {Object} query params
 */
export function createChallengeParams(filter) {
  let params = _.pick(filter, Object.keys(queryScheme));
  return {
    ...params,
    types: params.types.map(
      (type) => constants.FILTER_CHALLENGE_TYPE_ABBREVIATIONS[type]
    ),
    tracks: params.tracks.map(
      (track) => constants.FILTER_CHALLENGE_TRACK_ABBREVIATIONS[track]
    ),
    includeAllTags: params.tags.length ? params.includeAllTags : null,
  };
}

/**
 * Convert the frontend filter into the backend criteria.
 *
 * @param {Object} filter The frontend filter
 *
 * @return {Object} challenge criteria
 */
export function createChallengeCriteria(filter) {
  return {
    page: filter.page,
    perPage: filter.perPage,
    types: filter.types.map(
      (type) => constants.FILTER_CHALLENGE_TYPE_ABBREVIATIONS[type]
    ),
    tracks: filter.tracks.map(
      (track) => constants.FILTER_CHALLENGE_TRACK_ABBREVIATIONS[track]
    ),
    search: filter.search,
    tags: filter.tags,
    status: filter.status,
    startDateStart: filter.startDateStart,
    startDateEnd: filter.startDateEnd,
    endDateStart: filter.endDateStart,
    endDateEnd: filter.endDateEnd,
    sortBy: validateSortBy(filter.sortBy),
    sortOrder: constants.SORT_BY_SORT_ORDER[filter.sortBy],
    groups: filter.groups,
    events: filter.events,
    totalPrizesFrom: filter.totalPrizesFrom,
    totalPrizesTo: filter.totalPrizesTo,
    includeAllTags: filter.tags.length ? filter.includeAllTags : null,
    isLightweight: true,
  };
}

/**
 * Return the current sort-by if supported; otherwise return the failback.
 */
export function validateSortBy(sortBy) {
  return ["updated", "overview.totalPrizes", "name"].includes(sortBy)
    ? sortBy
    : constants.CHALLENGE_SORT_BY_MOST_RECENT;
}

export function createOpenForRegistrationChallengeCriteria() {
  return {
    status: "Active",
    currentPhaseName: "Registration",
    endDateStart: null,
    startDateEnd: null,
  };
}

export function createAllActiveChallengeCriteria() {
  return {
    status: "Active",
    endDateStart: null,
    startDateEnd: null,
  };
}

export function createClosedChallengeCriteria() {
  return {
    status: "Completed",
    sortBy: constants.CHALLENGE_SORT_BY_MOST_RECENT,
    sortOrder: constants.SORT_ORDER.DESC,
  };
}

export function createOpenForRegistrationCountCriteria() {
  return {
    status: "Active",
    currentPhaseName: "Registration",
    isLightweight: true,
    page: 1,
    perPage: 1,
    endDateStart: null,
    startDateEnd: null,
  };
}

/**
 * Determine which frontend attributes will be capable of triggering api calls.
 */
export function shouldFetchChallenges(filterUpdate) {
  const attributes = Object.keys(filterUpdate);
  return _.some(attributes, (attr) =>
    [
      "page",
      "perPage",
      "types",
      "tracks",
      "search",
      "tags",
      "status",
      "startDateStart",
      "startDateEnd",
      "endDateStart",
      "endDateEnd",
      "sortBy",
      "groups",
      "events",
      "bucket",
      "totalPrizesFrom",
      "totalPrizesTo",
      "includeAllTags",
    ].includes(attr)
  );
}

export function checkRequiredFilterAttributes(filter) {
  let valid = true;
  if (
    !filter.tracks ||
    filter.tracks.length === 0 ||
    !filter.types ||
    filter.types.length === 0 ||
    !filter.bucket
  ) {
    valid = false;
  }
  return valid;
}

export function createEmptyResult() {
  const result = [];
  result.meta = { page: 0, perPage: 0, total: 0, totalPages: 0 };
  return result;
}

export function createEmptyChallengeFilter() {
  const filter = _.cloneDeep(initialChallengeFilter);
  return _.pick(filter, [
    "types",
    "tracks",
    "search",
    "tags",
    "groups",
    "events",
    "startDateEnd",
    "endDateStart",
    "page",
    "perPage",
    "sortBy",
    "totalPrizesFrom",
    "totalPrizesTo",
    "includeAllTags",
    "recommended",
  ]);
}

/**
 * Check if community is hidden.
 *
 * @param {Object<{
 *  hidden: boolean,
 *  hideFilter: boolean,
 * }>} community Community
 */
export function isHiddenCommunity(community) {
  return community.hidden || community.hideFilter;
}

/**
 * Check if community is to TCO.
 *
 * @param {Object<{
 *  challengeFilter: Object<{ events: string[] }>,
 * }>} community Community
 */
export function isTCOEventCommunity(community) {
  return (
    community.challengeFilter.events &&
    community.challengeFilter.events.length > 0
  );
}

/**
 * Check if community associates with a group.
 *
 * @param {Object<{
 *  groupIds: string[],
 * }>} community Community
 */
export function isGroupCommunity(community) {
  return community.groupIds && community.groupIds.length > 0;
}

export function getCommunityEvent(community) {
  return _.get(community, "challengeFilter.events[0]");
}

export function getCommunityGroup(community) {
  return _.get(community, "groupIds[0]");
}

/**
 * Returns phase's end date.
 * @param {Object} phase
 * @return {Date}
 */
export function getChallengePhaseEndDate(phase) {
  // Case 1: phase is still open. take the `scheduledEndDate`
  // Case 2: phase is not open but `scheduledStartDate` is a future date.
  // This means phase is not yet started. So take the `scheduledEndDate`
  // Case 3: phase is not open & `scheduledStartDate` is a past date,
  // but the phase is `Iterative Review`. It will take the `scheduledEndDate`
  // as it's a valid scenario for iterative review,
  // there might not be any submission yet to open the phase
  if (
    phase.isOpen ||
    moment(phase.scheduledStartDate).isAfter() ||
    phase.name === "Iterative Review"
  ) {
    return new Date(phase.scheduledEndDate);
  }
  // for other cases, take the `actualEndDate` as phase is already closed
  return new Date(phase.actualEndDate);
}

/**
 * Returns phase's start date.
 * @param {Object} phase
 * @return {Date}
 */
export function getChallengePhaseStartDate(phase) {
  // Case 1: Phase is not yet started. take the `scheduledStartDate`
  if (phase.isOpen !== true && moment(phase.scheduledStartDate).isAfter()) {
    return new Date(phase.scheduledStartDate);
  }
  // For all other cases, take the `actualStartDate` as phase is already started
  return new Date(phase.actualStartDate);
}

/**
 * Returns challenge's end date.
 * @param {Object} challenge
 * @return {Date}
 */
export function getChallengeEndDate(challenge) {
  const type = challenge.type;
  let phases = challenge.phases || [];
  if (type === "First2Finish" && challenge.status === "Completed") {
    phases = challenge.phases.filter(
      (p) => p.phaseType === "Iterative Review" && p.phaseStatus === "Closed"
    );
  }
  const endPhaseDate = Math.max(
    ...phases.map((phase) => getChallengePhaseEndDate(phase))
  );
  return endPhaseDate;
}

const STALLED_MSG = "Stalled";
const DRAFT_MSG = "In Draft";

function getChallengeStatusPhase(challenge) {
  const allPhases = challenge.phases || [];
  const type = challenge.type;

  let statusPhase = allPhases
    .filter((p) => p.name !== "Registration" && p.isOpen)
    .sort((a, b) => moment(a.scheduledEndDate).diff(b.scheduledEndDate))[0];

  if (!statusPhase && type === "First2Finish" && allPhases.length) {
    statusPhase = _.clone(allPhases[0]);
    statusPhase.name = "Submission";
  }

  return statusPhase;
}

export function getChallengePhaseMessage(challenge) {
  const status = challenge.status;
  const statusPhase = getChallengeStatusPhase(challenge);

  let phaseMessage = STALLED_MSG;
  if (statusPhase) phaseMessage = statusPhase.name;
  else if (status === "Draft") phaseMessage = DRAFT_MSG;

  return phaseMessage;
}

/**
 * Generates human-readable string containing time till the phase end.
 * @param {Object} challenge phase need to check
 * @return {string} time remaining text
 */
export function getChallengeActivePhaseTimeLeftMessage(challenge) {
  const STALLED_TIME_LEFT_MSG = "Challenge is currently on hold";
  const FF_TIME_LEFT_MSG = "Winner is working on fixes";
  const HOUR_MS = 60 * 60 * 1000;
  const DAY_MS = 24 * HOUR_MS;
  const phase = getChallengeStatusPhase(challenge);

  if (!phase) return { text: STALLED_TIME_LEFT_MSG };
  if (phase.phaseType === "Final Fix") {
    return { text: FF_TIME_LEFT_MSG };
  }

  let time = moment(getChallengePhaseEndDate(phase)).diff();
  const late = time < 0;
  if (late) time = -time;

  let format;
  if (time > DAY_MS) format = "D[d] H[h]";
  else if (time > HOUR_MS) format = "H[h] m[min]";
  else format = "m[min] s[s]";

  const text = moment.duration(time).format(format);

  return { late, time, text };
}
