import { size, sortBy } from "lodash";
import { handleActions } from "redux-actions";
import * as constants from "../constants";

const defaultState = {
  loadingMyGigs: false,
  loadingMyGigsError: null,
  [constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS]: {
    myGigs: null,
    page: 1,
    numLoaded: 0,
    total: 0,
  },
  [constants.GIGS_FILTER_STATUSES.OPEN_JOBS]: {
    myGigs: null,
    page: 1,
    numLoaded: 0,
    total: 0,
  },
  [constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS]: {
    myGigs: null,
    page: 1,
    numLoaded: 0,
    total: 0,
  },
  [constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS]: {
    myGigs: null,
    page: 1,
    numLoaded: 0,
    total: 0,
  },
  profile: {},
  loadingProfile: false,
  loadingProfileError: null,
  updatingProfile: false,
  updatingProfileError: null,
  updatingProfileSucess: null,
  checkingGigs: false,
};

function onGetMyActiveGigsInit(state) {
  return { ...state, loadingMyGigs: true, loadingMyGigsError: null };
}

function onGetMyActiveGigsDone(state, { payload }) {
  const currentGigs =
    state[constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS].myGigs || [];
  return {
    ...state,
    [constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS]: {
      myGigs: sortBy(currentGigs.concat(payload.myGigs), ["sortPrio"]),
      total: payload.total,
      numLoaded: currentGigs.length + payload.myGigs.length,
      page: payload.page,
    },
    loadingMyGigs: false,
    loadingMyGigsError: null,
  };
}

function onGetMyOpenGigsInit(state) {
  return { ...state, loadingMyGigs: true, loadingMyGigsError: null };
}

function onGetMyOpenGigsDone(state, { payload }) {
  const currentGigs =
    state[constants.GIGS_FILTER_STATUSES.OPEN_JOBS].myGigs || [];
  return {
    ...state,
    [constants.GIGS_FILTER_STATUSES.OPEN_JOBS]: {
      myGigs: sortBy(currentGigs.concat(payload.myGigs), ["sortPrio"]),
      total: payload.total,
      numLoaded: currentGigs.length + payload.myGigs.length,
      page: payload.page,
    },
    loadingMyGigs: false,
    loadingMyGigsError: null,
  };
}

function onGetMyCompletedGigsInit(state) {
  return { ...state, loadingMyGigs: true, loadingMyGigsError: null };
}

function onGetMyCompletedGigsDone(state, { payload }) {
  const currentGigs =
    state[constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS].myGigs || [];
  return {
    ...state,
    [constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS]: {
      myGigs: sortBy(currentGigs.concat(payload.myGigs), ["sortPrio"]),
      total: payload.total,
      numLoaded: currentGigs.length + payload.myGigs.length,
      page: payload.page,
    },
    loadingMyGigs: false,
    loadingMyGigsError: null,
  };
}

function onGetMyArchivedGigsInit(state) {
  return { ...state, loadingMyGigs: true, loadingMyGigsError: null };
}

function onGetMyArchivedGigsDone(state, { payload }) {
  const currentGigs =
    state[constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS].myGigs || [];
  return {
    ...state,
    [constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS]: {
      myGigs: sortBy(currentGigs.concat(payload.myGigs), ["sortPrio"]),
      total: payload.total,
      numLoaded: currentGigs.length + payload.myGigs.length,
      page: payload.page,
    },
    loadingMyGigs: false,
    loadingMyGigsError: null,
  };
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
    GET_MY_ACTIVE_GIGS_INIT: onGetMyActiveGigsInit,
    GET_MY_ACTIVE_GIGS_DONE: onGetMyActiveGigsDone,
    GET_MY_OPEN_GIGS_INIT: onGetMyOpenGigsInit,
    GET_MY_OPEN_GIGS_DONE: onGetMyOpenGigsDone,
    GET_MY_COMPLETED_GIGS_INIT: onGetMyCompletedGigsInit,
    GET_MY_COMPLETED_GIGS_DONE: onGetMyCompletedGigsDone,
    GET_MY_ARCHIVED_GIGS_INIT: onGetMyArchivedGigsInit,
    GET_MY_ARCHIVED_GIGS_DONE: onGetMyArchivedGigsDone,

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
