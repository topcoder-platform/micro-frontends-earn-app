import { handleActions } from "redux-actions";
import * as constants from "../constants";
import _ from "lodash";

const defaultState = {
  challenge: {
    types: constants.FILTER_CHALLENGE_TYPES,
    tracks: constants.FILTER_CHALLENGE_TRACKS.filter((track) => track !== "QA"),
    search: "",
    tags: [],
    groups: [],
    events: [],
    startDateEnd: null,
    endDateStart: null,
    page: 1,
    perPage: constants.PAGINATION_PER_PAGES[0],
    sortBy: constants.CHALLENGE_SORT_BY_RECOMMENDED,
    totalPrizesFrom: 0,
    totalPrizesTo: 10000,
    // ---

    bucket: constants.FILTER_BUCKETS[1],
    recommended: false,
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

export default handleActions(
  {
    INIT_APP: onInitApp,
    UPDATE_FILTER: onUpdateFilter,
    CLEAR_CHALLENGE_FILTER: onClearChallengeFilter,
  },
  defaultState
);

export const initialChallengeFilter = _.cloneDeep(defaultState.challenge);
