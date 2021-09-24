require("dotenv").config();

module.exports = {
  MFE_CONFIG: {
    '@topcoder/micro-frontends-challenges-app': 'http://localhost:8009/challenges-app/topcoder-micro-frontends-challenges-app.js',
    '@topcoder/micro-frontends-gigs-app': 'https://platform.topcoder-dev.com/gigs-app/topcoder-micro-frontends-gigs-app.js',
  }
};
