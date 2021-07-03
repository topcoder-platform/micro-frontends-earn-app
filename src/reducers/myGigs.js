import { size, sortBy } from "lodash";
import { handleActions } from "redux-actions";

const defaultState = {
  loadingMyGigs: false,
  loadingMyGigsError: null,
  myGigs: null,
  total: 0,
  numLoaded: 0,
  loadingMore: false,
  loadingMoreError: null,
  profile: {},
  loadingProfile: false,
  loadingProfileError: null,
  updatingProfile: false,
  updatingProfileError: null,
  updatingProfileSucess: null,
  checkingGigs: true,
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
    myGigs: null,
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

function onGetProfileInit(state) {
  return { ...state, loadingProfile: true, loadingProfileError: null };
}

function onGetProfileDone(state, { payload }) {
  return {
    ...state,
    profile: { ...payload },
    loadingProfile: false,
    loadingProfileError: null,
  };
}

function onGetProfileFailure(state, { payload }) {
  return {
    ...state,
    loadingProfile: false,
    loadingProfileError: payload,
    profile: {},
  };
}

function onUpdateProfileInit(state) {
  return {
    ...state,
    updatingProfile: true,
    updatingProfileError: null,
    updatingProfileSucess: null,
  };
}

function onUpdateProfileDone(state, { payload }) {
  return {
    ...state,
    profile: { ...payload },
    loadingProfile: false,
    updatingProfileError: null,
    updatingProfileSucess: true,
  };
}

function onUpdateProfileFailure(state, { payload }) {
  return {
    ...state,
    loadingProfile: false,
    updatingProfileError: payload,
    updatingProfileSucess: false,
  };
}

function onCheckingGigsInit(state) {
  return {
    ...state,
    checkingGigs: true,
  };
}

function onCheckingGigsDone(state) {
  return {
    ...state,
    checkingGigs: false,
  };
}

export default handleActions(
  {
    GET_MY_GIGS_INIT: onGetMyGigsInit,
    GET_MY_GIGS_DONE: onGetMyGigsDone,
    GET_MY_GIGS_FAILURE: onGetMyGigsFailure,
    LOAD_MORE_MY_GIGS_INIT: onLoadMoreMyGigsInit,
    LOAD_MORE_MY_GIGS_DONE: onLoadMoreMyGigsDone,
    LOAD_MORE_MY_GIGS_FAILURE: onLoadMoreMyGigsFailure,
    GET_PROFILE_INIT: onGetProfileInit,
    GET_PROFILE_DONE: onGetProfileDone,
    GET_PROFILE_FAILURE: onGetProfileFailure,
    UPDATE_PROFILE_INIT: onUpdateProfileInit,
    UPDATE_PROFILE_DONE: onUpdateProfileDone,
    UPDATE_PROFILE_FAILURE: onUpdateProfileFailure,
    START_CHECKING_GIGS_INIT: onCheckingGigsInit,
    START_CHECKING_GIGS_DONE: onCheckingGigsDone,
  },
  defaultState
);
