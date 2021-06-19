import { createActions } from "redux-actions";
import { PER_PAGE } from "../constants";
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

export default createActions({
  GET_MY_GIGS: getMyGigs,
  LOAD_MORE_MY_GIGS: loadMoreMyGigs,
});
