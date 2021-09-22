require("dotenv").config();

module.exports = {
  MFE_CONFIG: {
    "@topcoder/micro-frontends-challenges-app":
      "https://platform.topcoder-dev.com/challenges-app/topcoder-micro-frontends-challenges-app.js",
    "@topcoder/micro-frontends-gigs-app":
      "https://platform.topcoder-dev.com/gigs-app/topcoder-micro-frontends-gigs-app.js",
  },
  URL: {
    BASE: process.env.URL_BASE || "https://www.topcoder-dev.com",
  },
};
