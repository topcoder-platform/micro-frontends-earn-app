import { createActions } from "redux-actions";
import service from "../services/challenges";
import * as util from "../utils/challenge";
import * as constants from "../constants";

async function doGetChallenges(filter) {
  return service.getChallenges(filter);
}

async function getAllActiveChallenges(filter) {
  const allActiveFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createAllActiveChallengeCriteria(),
  };
  return doGetChallenges(allActiveFilter);
}

async function getOpenForRegistrationChallenges(filter) {
  const openForRegistrationFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createOpenForRegistrationChallengeCriteria(),
  };
  return doGetChallenges(openForRegistrationFilter);
}

async function getClosedChallenges(filter) {
  const closedFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createClosedChallengeCriteria(),
  };
  return doGetChallenges(closedFilter);
}

async function getOpenForRegistrationCount(filter) {
  const openForRegistrationCountCriteria = {
    ...util.createChallengeCriteria(filter),
    ...util.createOpenForRegistrationCountCriteria(),
  };
  return doGetChallenges(openForRegistrationCountCriteria);
}

async function getChallenges(filter) {
  const ALL_ACTIVE_CHALLENGES_BUCKET = constants.FILTER_BUCKETS[0];
  const OPEN_FOR_REGISTRATION_BUCKET = constants.FILTER_BUCKETS[1];
  const CLOSED_CHALLENGES = constants.FILTER_BUCKETS[2];

  let challenges;
  let challengesFiltered;
  let total;
  let openForRegistrationCount;

  const getChallengesByBucket = async (f) => {
    const promises = [];
    switch (f.bucket) {
      case ALL_ACTIVE_CHALLENGES_BUCKET:
        promises.push(getAllActiveChallenges(f));
        break;
      case OPEN_FOR_REGISTRATION_BUCKET:
        promises.push(getOpenForRegistrationChallenges(f));
        break;
      case CLOSED_CHALLENGES:
        promises.push(getClosedChallenges(f));
        break;
      default:
        return [util.createEmptyResult(), 0];
    }
    promises.push(getOpenForRegistrationCount(f));
    return Promise.all(promises).then((result) => [
      result[0],
      result[1].meta.total,
    ]);
  };

  if (!util.checkRequiredFilterAttributes(filter)) {
    return {
      challenges: [],
      challengesFiltered: [],
      total: 0,
      openForRegistrationCount: 0,
    };
  }

  [challenges, openForRegistrationCount] = await getChallengesByBucket(filter);
  challengesFiltered = challenges;
  total = challenges.meta.total;

  return { challenges, challengesFiltered, total, openForRegistrationCount };
}

export default createActions({
  GET_CHALLENGES: getChallenges,
});
