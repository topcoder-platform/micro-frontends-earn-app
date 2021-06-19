import { handleActions } from "redux-actions";
import * as constants from "../constants";

const defaultState = {
  buckets: constants.FILTER_BUCKETS,
  types: constants.FILTER_CHALLENGE_TYPES,
  tracks: constants.FILTER_CHALLENGE_TRACKS,
  tags: [],
  subCommunities: [],
  isLoggedIn: null,
};

function onGetTagsDone(state, { payload }) {
  return { ...state, tags: payload };
}

function onGetCommunityListDone(state, { payload }) {
  return { ...state, subCommunities: payload };
}

function onCheckIsLoggedInDone(state, { payload }) {
  return { ...state, isLoggedIn: payload };
}

export default handleActions(
  {
    GET_TAGS_DONE: onGetTagsDone,
    GET_COMMUNITY_LIST_DONE: onGetCommunityListDone,
    CHECK_IS_LOGGED_IN_DONE: onCheckIsLoggedInDone,
  },
  defaultState
);
