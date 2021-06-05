import { createActions } from "redux-actions";
import service from "../services/lookup";

async function getTags() {
  return service.getTags();
}

async function getCommunityList() {
  return service.getCommunityList();
}

async function checkIsLoggedIn() {
  return service.checkIsLoggedIn();
}

async function getGigPhases() {
  return service.getGigPhases();
}

export default createActions({
  GET_TAGS: getTags,
  GET_COMMUNITY_LIST: getCommunityList,
  CHECK_IS_LOGGED_IN: checkIsLoggedIn,
  GET_GIG_PHASES: getGigPhases,
});
