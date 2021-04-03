import api from "./api";
import * as util from "../utils/url";

/**
 * Search challenges
 *
 * @return {Array<Object>} challenges
 */
async function getChallenges(filter) {
  const challengeQuery = util.buildQueryString(filter);
  return api.get(`/challenges/${challengeQuery}`);
}

async function getRecommendedChallenges (filter, handle) {
  const challengeQuery = util.buildQueryString(filter);
  return api.get(`/recommender-api/${handle}/${challengeQuery}`);
}

export default {
  getChallenges,
  getRecommendedChallenges,
};
