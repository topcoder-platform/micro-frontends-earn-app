import { handleActions } from "redux-actions";
import * as constants from "../constants";
import _ from "lodash";

const defaultState = {
  challenge: {
    types: constants.FILTER_CHALLENGE_TYPES,
    tracks: constants.FILTER_CHALLENGE_TRACKS,
    search: "",
    tags: [],
    groups: [],
    events: [],
    startDateEnd: null,
    endDateStart: null,
    page: 1,
    perPage: constants.PAGINATION_PER_PAGES[0],
    sortBy: constants.CHALLENGE_SORT_BY_MOST_RECENT,
    totalPrizesFrom: 0,
    totalPrizesTo: 10000,
    // ---

    bucket: constants.FILTER_BUCKETS[1],
  },
  gig: {
    status: constants.GIGS_FILTER_STATUSES.OPEN_JOBS,
  },
};

function onInitApp(state, { payload }) {
  return {
    ...state,
    challenge: { ...state.challenge, ...payload },
  };
}

function onUpdateFilter(state, { payload }) {
  return {
    ...state,
    challenge: { ...state.challenge, ...payload },
  };
}

function onClearChallengeFilter(state, { payload }) {
  return { ...state, challenge: { ...state.challenge, ...payload } };
}

function onUpdateGigFilter(state, { payload }) {
  return {
    ...state,
    gig: {
      ...state.gig,
      ...payload,
    },
  };
}

export default handleActions(
  {
    INIT_APP: onInitApp,
    UPDATE_FILTER: onUpdateFilter,
    CLEAR_CHALLENGE_FILTER: onClearChallengeFilter,
    UPDATE_GIG_FILTER: onUpdateGigFilter,
  },
  defaultState
);

export const initialChallengeFilter = _.cloneDeep(defaultState.challenge);
export const initialGigFilter = _.cloneDeep(defaultState.gig);
