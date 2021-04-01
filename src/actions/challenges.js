import { createActions } from "redux-actions";
import service from "../services/challenges";
import * as util from "../utils/challenge";
import * as constants from "../constants";

async function doGetChallenges(filter) {
  return service.getChallenges(filter);
}

async function getActiveChallenges(filter) {
  const activeFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createActiveChallengeCriteria(),
  };
  return doGetChallenges(activeFilter);
}

async function getOpenForRegistrationChallenges(filter) {
  const openForRegistrationFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createOpenForRegistrationChallengeCriteria(),
  };
  return doGetChallenges(openForRegistrationFilter);
}

async function getPastChallenges(filter) {
  const pastFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createPastChallengeCriteria(),
  };
  return doGetChallenges(pastFilter);
}

function doFilterBySubSommunities(challenges) {
  return challenges;
}
function doFilterByPrizeFrom(challenges) {
  return challenges;
}
function doFilterByPrizeTo(challenges) {
  return challenges;
}

async function getChallenges(filter, change) {
  const FILTER_BUCKETS = constants.FILTER_BUCKETS;
  let challenges;
  let challengesFiltered;
  let total;
  let filterChange = change;

  const getChallengesByBucket = async (f) => {
    switch (f.bucket) {
      case FILTER_BUCKETS[0]:
        return getActiveChallenges(f);
      case FILTER_BUCKETS[1]:
        return getOpenForRegistrationChallenges(f);
      case FILTER_BUCKETS[2]:
        return getPastChallenges(f);
      default:
        return [];
    }
  };

  if (!util.checkRequiredFilterAttributes(filter)) {
    return { challenges: [], challengesFiltered: [], total: 0 };
  }

  if (!filterChange) {
    const chs = await getChallengesByBucket(filter);
    return { challenges: chs, challengesFiltered: chs, total: chs.meta.total };
  }

  if (util.shouldFetchChallenges(filterChange)) {
    challenges = await getChallengesByBucket(filter);
  }

  challengesFiltered = challenges;
  total = challenges.meta.total;
  if (util.shouldFilterChallenges(filterChange)) {
    challengesFiltered = doFilterBySubSommunities(challengesFiltered);
    challengesFiltered = doFilterByPrizeFrom(challengesFiltered);
    challengesFiltered = doFilterByPrizeTo(challengesFiltered);
  }

  return { challenges, challengesFiltered, total };
}

export default createActions({
  GET_CHALLENGES: getChallenges,
});
