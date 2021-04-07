import { handleActions } from "redux-actions";
import * as util from "../utils/challenge";
import * as constants from "../constants";

const defaultState = {
  loadingChallenges: false,
  loadingChallengesError: null,
  loadingRecommendedChallengesError: false,
  challenges: [],
  allActiveChallenges: [],
  openForRegistrationChallenges: [],
  closedChallenges: [],
  openForRegistrationCount: 0,
  total: 0,
};

function onGetChallengesInit(state) {
  return {
    ...state,
    loadingChallenges: true,
    loadingChallengesError: null,
    loadingRecommendedChallengesError: false,
  };
}

function onGetChallengesDone(state, { payload }) {
  return {
    ...state,
    loadingChallenges: false,
    loadingChallengesError: null,
    loadingRecommendedChallengesError:
      payload.loadingRecommendedChallengesError,
    challenges: payload.challenges,
    allActiveChallenges: payload.allActiveChallenges,
    openForRegistrationChallenges: payload.openForRegistrationChallenges,
    closedChallenges: payload.closedChallenges,
    openForRegistrationCount: payload.openForRegistrationCount,
    total: payload.total,
  };
}

function onGetChallengesFailure(state, { payload }) {
  return {
    ...state,
    loadingChallenges: false,
    loadingChallengesError: payload,
    challenges: [],
    allActiveChallenges: [],
    openForRegistrationChallenges: [],
    closedChallenges: [],
    openForRegistrationCount: 0,
    total: 0,
  };
}

function onUpdateFilter(state, { payload }) {
  const FILTER_BUCKETS = constants.FILTER_BUCKETS;
  const BUCKET_ALL_ACTIVE_CHALLENGES = FILTER_BUCKETS[0];
  const BUCKET_OPEN_FOR_REGISTRATION = FILTER_BUCKETS[1];
  const BUCKET_CLOSED_CHALLENGES = FILTER_BUCKETS[2];
  const filterChange = payload;
  const {
    allActiveChallenges,
    openForRegistrationChallenges,
    closedChallenges,
  } = state;

  let challenges;
  let total;

  if (util.isSwitchingBucket(filterChange)) {
    switch (filterChange.bucket) {
      case BUCKET_ALL_ACTIVE_CHALLENGES:
        challenges = allActiveChallenges;
        break;
      case BUCKET_OPEN_FOR_REGISTRATION:
        challenges = openForRegistrationChallenges;
        break;
      case BUCKET_CLOSED_CHALLENGES:
        challenges = closedChallenges;
        break;
    }
    total = challenges.meta.total;

    return { ...state, challenges, total };
  }

  return { ...state };
}

export default handleActions(
  {
    GET_CHALLENGE_INIT: onGetChallengesInit,
    GET_CHALLENGES_DONE: onGetChallengesDone,
    GET_CHALLENGES_FAILURE: onGetChallengesFailure,
    UPDATE_FILTER: onUpdateFilter,
  },
  defaultState
);
