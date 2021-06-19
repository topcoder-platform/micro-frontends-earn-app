import { size, sortBy } from "lodash";
import { handleActions } from "redux-actions";

const defaultState = {
  loadingMyGigs: false,
  loadingMyGigsError: null,
  myGigs: [],
  total: 0,
  numLoaded: 0,
  loadingMore: false,
  loadingMoreError: null,
};

function onGetMyGigsInit(state) {
  return { ...state, loadingMyGigs: true, loadingMyGigsError: null };
}

function onGetMyGigsDone(state, { payload }) {
  return {
    ...state,
    myGigs: sortBy(payload.myGigs, ["sortPrio"]),
    total: payload.total,
    numLoaded: payload.myGigs.length,
    loadingMyGigs: false,
    loadingMyGigsError: null,
  };
}

function onGetMyGigsFailure(state, { payload }) {
  return {
    ...state,
    loadingMyGigs: false,
    loadingMyGigsError: payload,
    myGigs: [],
    total: 0,
    numLoaded: 0,
  };
}

function onLoadMoreMyGigsInit(state) {
  return { ...state, loadingMore: true, loadingMoreError: null };
}

function onLoadMoreMyGigsDone(state, { payload: { myGigs } }) {
  return {
    ...state,
    myGigs: sortBy(state.myGigs.concat(myGigs), ["sortPrio"]),
    numLoaded: state.numLoaded + size(myGigs),
    loadingMore: false,
    loadingMoreError: null,
  };
}

function onLoadMoreMyGigsFailure(state, { payload }) {
  return { ...state, loadingMore: false, loadingMoreError: payload };
}

export default handleActions(
  {
    GET_MY_GIGS_INIT: onGetMyGigsInit,
    GET_MY_GIGS_DONE: onGetMyGigsDone,
    GET_MY_GIGS_FAILURE: onGetMyGigsFailure,
    LOAD_MORE_MY_GIGS_INIT: onLoadMoreMyGigsInit,
    LOAD_MORE_MY_GIGS_DONE: onLoadMoreMyGigsDone,
    LOAD_MORE_MY_GIGS_FAILURE: onLoadMoreMyGigsFailure,
  },
  defaultState
);
