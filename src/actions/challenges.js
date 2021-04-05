import { createActions } from "redux-actions";
import service from "../services/challenges";
import * as util from "../utils/challenge";
import * as constants from "../constants";

async function doGetChallenges(filter) {
  return service.getChallenges(filter);
}

async function getAllActiveChallenges(filter) {
  const BUCKET_ALL_ACTIVE_CHALLENGES = constants.FILTER_BUCKETS[0];
  let page;

  if (util.isDisplayingBucket(filter, BUCKET_ALL_ACTIVE_CHALLENGES)) {
    page = filter.page;
  } else {
    page = 1;
  }

  const allActiveFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createAllActiveChallengeCriteria(),
    page,
  };
  return doGetChallenges(allActiveFilter);
}

async function getOpenForRegistrationChallenges(filter) {
  const BUCKET_OPEN_FOR_REGISTRATION = constants.FILTER_BUCKETS[1];
  let page;

  if (util.isDisplayingBucket(filter, BUCKET_OPEN_FOR_REGISTRATION)) {
    page = filter.page;
  } else {
    page = 1;
  }

  const openForRegistrationFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createOpenForRegistrationChallengeCriteria(),
    page,
  };
  return doGetChallenges(openForRegistrationFilter);
}

async function getClosedChallenges(filter) {
  const BUCKET_CLOSED_CHALLENGES = constants.FILTER_BUCKETS[1];
  let page;

  if (util.isDisplayingBucket(filter, BUCKET_CLOSED_CHALLENGES)) {
    page = filter.page;
  } else {
    page = 1;
  }

  const closedFilter = {
    ...util.createChallengeCriteria(filter),
    ...util.createClosedChallengeCriteria(),
    page,
  };
  return doGetChallenges(closedFilter);
}

async function getRecommendedChallenges(filter) {
  let result = [];
  result.meta = { total: 0 };

  if (result.length === 0) {
    const failbackFilter = { ...filter };
    result = await getOpenForRegistrationChallenges(failbackFilter);
    result.loadingRecommendedChallengesError = true;
  }

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
  const BUCKET_CLOSED_CHALLENGES = FILTER_BUCKETS[2];
  const filterChange = change;
  const bucket = filter.bucket;

  const getChallengesByBuckets = async (f) => {
    return FILTER_BUCKETS.includes(f.bucket)
      ? Promise.all([
          getAllActiveChallenges(f),
          f.recommended
            ? getRecommendedChallenges(f)
            : getOpenForRegistrationChallenges(f),
          getClosedChallenges(f),
        ])
      : [[], [], []];
  };

  if (!filterChange) {
    let [
      allActiveChallenges,
      openForRegistrationChallenges,
      closedChallenges,
    ] = await getChallengesByBuckets(filter);
    let challenges;
    let openForRegistrationCount;
    let total;
    let loadingRecommendedChallengesError;

    switch (bucket) {
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
    openForRegistrationCount = openForRegistrationChallenges.meta.total;
    total = challenges.meta.total;
    loadingRecommendedChallengesError =
      challenges.loadingRecommendedChallengesError;

    return {
      challenges,
      total,
      openForRegistrationCount,
      loadingRecommendedChallengesError,
      allActiveChallenges,
      openForRegistrationChallenges,
      closedChallenges,
    };
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
  let loadingRecommendedChallengesError;

  if (util.shouldFetchChallenges(filterChange)) {
    [
      allActiveChallenges,
      openForRegistrationChallenges,
      closedChallenges,
    ] = await getChallengesByBuckets(filter);
    switch (bucket) {
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
  }

  openForRegistrationCount = openForRegistrationChallenges.meta.total;
  total = challenges.meta.total;
  loadingRecommendedChallengesError =
    challenges.loadingRecommendedChallengesError;

  if (util.shouldFilterChallenges(filterChange)) {
    challenges = doFilterBySubSommunities(challenges);
    challenges = doFilterByPrizeFrom(challenges);
    challenges = doFilterByPrizeTo(challenges);
  }

  return {
    challenges,
    total,
    openForRegistrationCount,
    loadingRecommendedChallengesError,
    allActiveChallenges,
    openForRegistrationChallenges,
    closedChallenges,
  };
}

export default createActions({
  GET_CHALLENGES: getChallenges,
});
