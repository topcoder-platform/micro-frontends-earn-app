import _ from "lodash";
import { handleActions } from "redux-actions";
import * as utils from "../utils";

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
  const challenges = payload.challenges;
  _.each(challenges, (challenge) => {
    if (utils.challenge.getChallengePhaseMessage(challenge) == "Stalled") {
      challenge.isStalled = true;
    }
  });
  const challengesFiltered = payload.challengesFiltered;
  _.each(challengesFiltered, (challenge) => {
    if (utils.challenge.getChallengePhaseMessage(challenge) == "Stalled") {
      challenge.isStalled = true;
    }
  });
  return {
    ...state,
    loadingChallenges: false,
    loadingChallengesError: null,
    challenges: challenges,
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
