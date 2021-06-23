/**
 * Contains Profile routes
 */
const constants = require("../app-constants");

module.exports = {
  "/profile": {
    get: {
      controller: "ProfileController",
      method: "getMyProfile",
      auth: "jwt",
      scopes: [constants.Scopes.READ_PROFILE, constants.Scopes.ALL_PROFILE],
    },
    post: {
      controller: "ProfileController",
      method: "updateMyProfile",
      auth: "jwt",
      scopes: [constants.Scopes.WRITE_PROFILE, constants.Scopes.ALL_PROFILE],
    },
  },
};
