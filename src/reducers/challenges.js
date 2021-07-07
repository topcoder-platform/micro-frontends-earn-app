import { handleActions } from "redux-actions";

const defaultState = {
  loadingChallenges: false,
  loadingChallengesError: null,
  challenges: [],
  challengesFiltered: [],
  total: 0,
  loadingRecommendedChallenges: false,
  loadingRecommendedChallengesError: null,
  recommendedChallenges: [],
  openForRegistrationCount: 0,
  initialized: false,
};

function onGetChallengesInit(state) {
  return { ...state, loadingChallenges: true, loadingChallengesError: null };
}

function onGetChallengesDone(state, { payload }) {
  return {
    ...state,
    loadingChallenges: false,
    loadingChallengesError: null,
    challenges: payload.challenges,
    challengesFiltered: payload.challengesFiltered,
    total: payload.total,
    openForRegistrationCount: payload.openForRegistrationCount,
    initialized: true,
  };
}

function onGetChallengesFailure(state, { payload }) {
  return {
    ...state,
    loadingChallenges: false,
    loadingChallengesError: payload,
    challenges: [],
    challengesFiltered: [],
    total: 0,
    openForRegistrationCount: 0,
    initialized: true,
  };
}

export default handleActions(
  {
    GET_CHALLENGE_INIT: onGetChallengesInit,
    GET_CHALLENGES_DONE: onGetChallengesDone,
    GET_CHALLENGES_FAILURE: onGetChallengesFailure,
  },
  defaultState
);
