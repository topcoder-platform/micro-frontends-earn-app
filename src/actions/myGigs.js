import { createActions } from "redux-actions";
import { PER_PAGE, CHECKING_GIG_TIMES } from "../constants";
import service from "../services/myGigs";

/**
 * Action to get my gigs.
 * @param {number} page page to fetch
 * @param {number} perPage items per page. by default is 10.
 * @returns
 */
async function getMyGigs(page = 1, perPage = PER_PAGE) {
  return service.getMyGigs(page, perPage);
}

/**
 * Action to load more pages of my gigs
 * @param {number} nextPage page to fetch
 * @param {*} perPage items per page. by default is 10
 * @returns
 */
async function loadMoreMyGigs(nextPage, perPage = PER_PAGE) {
  return service.getMyGigs(nextPage, perPage);
}

async function getProfile() {
  return service.getProfile();
}

async function updateProfile(profile) {
  return service.updateProfile(profile);
}

async function startCheckingGigs(externalId) {
  let i = 0;
  while (i < CHECKING_GIG_TIMES) {
    const res = await service.startCheckingGigs(externalId);
    if (res && !res.synced) {
      i++;
      continue;
    } else {
      return {};
    }
  }
  return {};
}

export default createActions({
  GET_MY_GIGS: getMyGigs,
  LOAD_MORE_MY_GIGS: loadMoreMyGigs,
  GET_PROFILE: getProfile,
  UPDATE_PROFILE: updateProfile,
  START_CHECKING_GIGS: startCheckingGigs,
});
