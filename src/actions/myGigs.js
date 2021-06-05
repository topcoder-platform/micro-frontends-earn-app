import { createActions } from "redux-actions";
import service from "../services/myGigs";

async function getMyGigs() {
  return service.getMyGigs();
}

async function loadMoreMyGigs() {
  return service.loadMoreMyGigs();
}

export default createActions({
  GET_MY_GIGS: getMyGigs,
  LOAD_MORE_MY_GIGS: loadMoreMyGigs,
});
