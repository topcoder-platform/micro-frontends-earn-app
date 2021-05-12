/**
 * Format utilities
 */
import _ from "lodash";

/**
 * Format page title to show in the browser header.
 *
 * @param {string} pageTitle page title
 */
export const formatPageTitle = (pageTitle) => {
  let formattedPageTitle = "TaaS | Topcoder";
  if (pageTitle) {
    formattedPageTitle = pageTitle + " | " + formattedPageTitle;
  }

  return formattedPageTitle;
};
