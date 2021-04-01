import _ from "lodash";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";

export async function getUserId() {
  const profile = await getAuthUserProfile();
  return profile.userId;
}
