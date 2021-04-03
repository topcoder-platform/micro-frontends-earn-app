import { createActions } from "redux-actions";
import service from "../services/challenges";
import * as util from "../utils/challenge";
import * as constants from "../constants";

async function doGetChallenges(filter) {
  return service.getChallenges(filter);
}

async function getAllActiveChallenges(filter) {
  const activeFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createAllActiveChallengeCriteria(),
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

async function getClosedChallenges(filter) {
  const pastFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createClosedChallengeCriteria(),
  };
  return doGetChallenges(pastFilter);
}

async function getRecommendedChallenges(filter) {
  const result = []
  result.meta = { total: 0 }
  return result;
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
  const BUCKET_ALL_ACTIVE_CHALLENGES = FILTER_BUCKETS[0];
  const BUCKET_OPEN_FOR_REGISTRATION = FILTER_BUCKETS[1];
  const BUCKET_PAST_CHALLENGES = FILTER_BUCKETS[2];
  const filterChange = change;
  const bucket = filter.bucket;

  const getChallengesByBuckets = async (f) => {
    return FILTER_BUCKETS.includes(f.bucket)
      ? Promise.all([
        getAllActiveChallenges(f),
        f.recommended ? getRecommendedChallenges() : getOpenForRegistrationChallenges(f),
        getClosedChallenges(f)
      ])
      : [[], [], []]
  };

  if (!filterChange) {
    let [allActiveChallenges, openForRegistrationChallenges, closedChallenges] = await getChallengesByBuckets(filter)
    let challenges;
    let openForRegistrationCount;
    let total;

    switch (bucket) {
      case BUCKET_ALL_ACTIVE_CHALLENGES: challenges = allActiveChallenges; break;
      case BUCKET_OPEN_FOR_REGISTRATION: challenges = openForRegistrationChallenges; break;
      case BUCKET_PAST_CHALLENGES: challenges = closedChallenges; break;
    }
    openForRegistrationCount = openForRegistrationChallenges.meta.total;
    total = challenges.meta.total;

    return { challenges, total, openForRegistrationCount, allActiveChallenges, openForRegistrationChallenges, closedChallenges };
  }

  if (!util.checkRequiredFilterAttributes(filter)) {
    return { challenges: [], challengesFiltered: [], total: 0 };
  }

  let allActiveChallenges;
  let openForRegistrationChallenges;
  let closedChallenges;
  let challenges;
  let openForRegistrationCount;
  let total;

  if (util.shouldFetchChallenges(filterChange)) {
    [allActiveChallenges, openForRegistrationChallenges, closedChallenges] = await getChallengesByBuckets(filter)
    switch (bucket) {
      case BUCKET_ALL_ACTIVE_CHALLENGES: challenges = allActiveChallenges; break;
      case BUCKET_OPEN_FOR_REGISTRATION: challenges = openForRegistrationChallenges; break;
      case BUCKET_PAST_CHALLENGES: challenges = closedChallenges; break;
    }
  }

  openForRegistrationCount = openForRegistrationChallenges.meta.total;
  total = challenges.meta.total;

  if (util.shouldFilterChallenges(filterChange)) {
    challenges = doFilterBySubSommunities(challenges);
    challenges = doFilterByPrizeFrom(challenges);
    challenges = doFilterByPrizeTo(challenges);
  }

  return { challenges, total, openForRegistrationCount, allActiveChallenges, openForRegistrationChallenges, closedChallenges };
}

export default createActions({
  GET_CHALLENGES: getChallenges,
});
