import { handleActions } from "redux-actions";
import * as constants from "../constants";

const defaultState = {
  buckets: constants.FILTER_BUCKETS,
  types: constants.FILTER_CHALLENGE_TYPES,
  tracks: constants.FILTER_CHALLENGE_TRACKS,
  tags: [],
  subCommunities: [],
  isLoggedIn: false,
};

function onGetTagsDone(state, { payload }) {
  return { ...state, tags: payload };
}

function onGetCommunityListDone(state, { payload }) {
  return { ...state, subCommunities: payload };
}

function onIsLoggedInDone(state, { payload }) {
  return { ...state, isLoggedIn: payload };
}

export default handleActions(
  {
    GET_TAGS_DONE: onGetTagsDone,
    GET_COMMUNITY_LIST_DONE: onGetCommunityListDone,
    IS_LOGGED_IN_DONE: onIsLoggedInDone,
  },
  defaultState
);
