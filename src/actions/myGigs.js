import { createActions } from "redux-actions";
import service from "../services/myGigs";

async function getMyGigs() {
  return service.getMyGigs();
}

async function loadMoreMyGigs() {
  return service.loadMoreMyGigs();
}

async function getProfile() {
  return service.getProfile();
}

async function updateProfile(profile) {
  return service.updateProfile(profile);
}

export default createActions({
  GET_MY_GIGS: getMyGigs,
  LOAD_MORE_MY_GIGS: loadMoreMyGigs,
  GET_PROFILE: getProfile,
  UPDATE_PROFILE: updateProfile,
});
