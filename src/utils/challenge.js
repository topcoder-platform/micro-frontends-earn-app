import moment from "moment";
import "moment-duration-format";
import _ from "lodash";
import * as constants from "../constants";

/**
 * Return the sum of placements, or `undefined` if not found.
 * @return {number|undefined}
 */
export function getChallengePurse(prizeSets) {
  const placementSet = prizeSets.find(
    (prizeSet) => prizeSet.type === "placement"
  );
  const prizes = placementSet && placementSet.prizes ? placementSet.prizes : [];
  return (
    prizes.length && prizes.reduce((sum, placement) => sum + placement.value, 0)
  );
}

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
    sortBy: filter.sortBy,
    sortOrder: filter.sortOrder || 'asc',
    groups: filter.groups,
  };
}

export function createOpenForRegistrationChallengeCriteria() {
  return {
    status: "Active",
    currentPhaseName: "Registration",
  };
}

export function createActiveChallengeCriteria() {
  return {
    status: "Active",
    currentPhaseName: "Submission",
    registrationEndDateEnd: new Date().toISOString(),
  };
}

export function createPastChallengeCriteria() {
  return {
    status: "Completed",
  };
}

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
      "sortOrder",
      "groups",
    ].includes(attr)
  );
}

export function shouldFilterChallenges(filterUpdate) {
  const attributes = Object.keys(filterUpdate);
  return _.some(attributes, (attr) =>
    ["prizeFrom", "prizeTo", "subCommunities"].includes(attr)
  );
}

export function checkRequiredFilterAttributes(filter) {
  let valid = true;
  if (
    filter.tracks.length === 0 ||
    filter.types.length === 0 ||
    !filter.bucket
  ) {
    valid = false;
  }
  return valid;
}

/**
 * Returns phase's end date.
 * @param {Object} phase
 * @return {Date}
 */
function getChallengePhaseEndDate(phase) {
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
