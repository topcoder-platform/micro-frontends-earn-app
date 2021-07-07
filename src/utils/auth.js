import _ from "lodash";
import {
  getAuthUserProfile,
  getAuthUserTokens,
  login,
} from "@topcoder/micro-frontends-navbar-app";

export async function getUserId() {
  const profile = await getAuthUserProfile();
  return profile.userId;
}

export async function isLoggedIn() {
  const { tokenV3, tokenV2 } = await getAuthUserTokens();
  return tokenV3 != null || tokenV2 != null;
}

export function logIn() {
  login();
}
