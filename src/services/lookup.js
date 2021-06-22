import api from "./api";
import qs from "qs";
import * as utils from "../utils";

async function getTags() {
  const v3 = true;
  const filter = {
    domain: "SKILLS",
    status: "APPROVED",
  };

  const response = await api.doFetch(
    `/tags/?filter=${encodeURIComponent(qs.stringify(filter))}&limit=1000`,
    {},
    v3
  );
  const data = await response.json();
  return data.result.content.map((tag) => tag.name);
}

async function checkIsLoggedIn() {
  const isLoggedIn = await utils.auth.isLoggedIn();
  return isLoggedIn;
}

async function doGetUserGroups() {
  const isLoggedIn = await utils.auth.isLoggedIn();

  if (isLoggedIn) {
    const userId = await utils.auth.getUserId();
    return api.get(`/groups?memberId=${userId}&membershipType=user`);
  }

  return [];
}

async function getCommunityList() {
  const groups = await doGetUserGroups();
  let communityListQuery = qs.stringify({ groups: groups.map((g) => g.id) });
  communityListQuery = communityListQuery
    ? `?${communityListQuery}`
    : communityListQuery;

  const response = await api.doFetch(
    `/community-app-assets/api/tc-communities${communityListQuery}`,
    {},
    null,
    process.env.URL.COMMUNITY_APP // eslint-disable-line no-undef
  );
  let communities = await response.json();
  return communities.filter(
    (community) => !utils.challenge.isHiddenCommunity(community)
  );
}

// async function getGigStatuses() {
//   return Promise.resolve(myGigsData.gigStatuses);
// }

/**
 * Gets paginated countries
 * @param {number} page page to fetch
 * @param {number} perPage number of items by page
 * @returns
 */
async function getPaginatedCountries(page = 1, perPage = 100) {
  const url = `/lookups/countries?page=${page}&perPage=${perPage}`;
  return await api.get(url);
}

export default {
  getTags,
  getCommunityList,
  checkIsLoggedIn,
  // getGigStatuses,
  getPaginatedCountries,
};
