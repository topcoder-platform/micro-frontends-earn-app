import { handleActions } from "redux-actions";
import * as constants from "../constants";

const defaultState = {
  challenge: {
    types: constants.FILTER_CHALLENGE_TYPES,
    tracks: constants.FILTER_CHALLENGE_TRACKS,
    search: "",
    tags: [],
    groups: [],
    startDateEnd: null,
    endDateStart: null,
    page: 1,
    perPage: constants.PAGINATION_PER_PAGE[0],
    sortBy: constants.CHALLENGE_SORT_BY["Most recent"],
    sortOrder: null,

    // ---

    bucket: constants.FILTER_BUCKETS[1],
    prizeFrom: 0,
    prizeTo: 10000,
    subCommunities: [],
  },
};

function onUpdateFilter(state, { payload }) {
  return { ...state, challenge: { ...state.challenge, ...payload } };
}

export default handleActions(
  {
    UPDATE_FILTER: onUpdateFilter,
  },
  defaultState
);
