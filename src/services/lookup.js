import api from "./api";
import qs from "qs";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import * as util from "../utils/auth";

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

async function doGetUserGroups() {
  let groups = []
  try {
    let profile
    try {
      profile = await getAuthUserProfile();
    } catch (e) {
      /* handle error */
    }

    if (profile) {
      return api.get(
        `/groups?memberId=${await util.getUserId()}&membershipType=user`
      );
    }
  } catch (e) {

  }
  return groups
}

async function getCommunityList() {

  const groups = await doGetUserGroups();
  const communityListQuery = qs.stringify({ groups: groups.map((g) => g.id) });
  const response = await api.doFetch(
    `/community-app-assets/api/tc-communities/?${communityListQuery}`,
    {},
    null,
    process.env.URL.COMMUNITY_APP // eslint-disable-line no-undef
  );
  const data = await response.json();
  return data.list;
}

export default {
  getTags,
  getCommunityList,
};
