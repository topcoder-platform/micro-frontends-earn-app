import _ from "lodash";
import { getAuthUserTokens, login } from "@topcoder/mfe-header";

export async function isLoggedIn() {
  const { tokenV3, tokenV2 } = await getAuthUserTokens();
  return tokenV3 != null || tokenV2 != null;
}

export function logIn() {
  login();
}
