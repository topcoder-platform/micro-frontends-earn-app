import _ from "lodash";
import qs from "qs";

/**
 * Return the query string of `params`:
 * `{ p: "" }`      => ""
 * `{ p: null }`      => ""
 * `{ p: undefined }` => ""
 * `{ p: value }`     => "p=value"
 * `{ p: [] }`        => ""
 * `{ p: ['Challenge', 'First2Finish', 'Task'] } => "p[]=Challenge&p[]=First2Finish&p[]=Task`
 * `{ p: ['Design', 'Development', 'Data Science', 'Quality Assurance'] }` => "p[]=Design&p[]=Development&p=Data%20Science&p[]=Quality%20Assurance"
 * `{ p: { Des: true, Dev: true, DS: false, QA: false } }` => "p[Des]=true&p[Dev]=true&p[DS]=false&p[QA]=false"
 *
 * @params {Object<{[key: string]: any}>} params Query string parameters
 * @return {String}
 */
export function buildQueryString(params) {
  params = _.omitBy(params, (p) => p == null || p === "" || p.length === 0);

  let queryString = qs.stringify(params, {
    encode: false,
    arrayFormat: "brackets",
  });
  queryString = queryString ? `?${queryString}` : queryString;

  return queryString;
}

export function parseUrlQuery(queryString) {
  return qs.parse(queryString, { ignoreQueryPrefix: true });
}

export function updateQuery(params) {
  const oldQuery = decodeURIComponent(window.location.search);
  let query = buildQueryString(params);
  query = `?${query.substring(1).split("&").sort().join("&")}`;
  if (query !== oldQuery) {
    window.history.pushState(window.history.state, "", query);
  }
}
