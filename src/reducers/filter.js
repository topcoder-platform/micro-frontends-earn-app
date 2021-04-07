import { handleActions } from "redux-actions";
import * as constants from "../constants";
import moment from "moment";

const defaultState = {
  challenge: {
    types: constants.FILTER_CHALLENGE_TYPES,
    tracks: constants.FILTER_CHALLENGE_TRACKS.filter((track) => track !== "QA"),
    search: "",
    tags: [],
    groups: [],
    endDateStart: moment().subtract(99, "year").toDate().toISOString(),
    startDateEnd: moment().add(1, "year").toDate().toISOString(),
    page: 1,
    perPage: constants.PAGINATION_PER_PAGE[0],
    sortBy: constants.CHALLENGE_SORT_BY["Most recent"],
    sortOrder: constants.SORT_ORDER.ASC,

    // ---

    bucket: constants.FILTER_BUCKETS[1],
    prizeFrom: 0,
    prizeTo: 10000,
    subCommunities: [],
    recommended: false,
  },
};

function onRestoreFilter(state, { payload }) {
  return { ...state, ...payload };
}

function onUpdateFilter(state, { payload }) {
  return { ...state, challenge: { ...state.challenge, ...payload } };
}

export default handleActions(
  {
    RESTORE_FILTER: onRestoreFilter,
    UPDATE_FILTER: onUpdateFilter,
  },
  defaultState
);
