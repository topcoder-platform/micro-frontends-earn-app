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

export default {
  getChallenges,
};
