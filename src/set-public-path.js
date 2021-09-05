/* global process importMapOverrides */
import { setPublicPath } from "systemjs-webpack-interop";
/* This dynamically sets the webpack public path so that code splits work properly. See related:
 * https://github.com/joeldenning/systemjs-webpack-interop#what-is-this
 * https://webpack.js.org/guides/public-path/#on-the-fly
 * https://single-spa.js.org/docs/faq/#code-splits
 */

setPublicPath("@topcoder/micro-frontends-earn-app");

const challengesAppUrl = process.env.MFE_CONFIG['@topcoder/micro-frontends-challenges-app']
const gigsAppUrl = process.env.MFE_CONFIG['@topcoder/micro-frontends-gigs-app']

importMapOverrides.resetOverrides()
importMapOverrides.addOverride('@topcoder/micro-frontends-challenges-app', challengesAppUrl)
importMapOverrides.addOverride('@topcoder/micro-frontends-gigs-app', gigsAppUrl)
