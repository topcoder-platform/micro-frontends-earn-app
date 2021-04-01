import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import * as utils from "../utils";

async function doFetch(endpoint, options = {}, v3, baseUrl) {
  const headers = options.headers ? { ...options.headers } : {};
  const token = await getAuthUserTokens();
  let url;
  if (baseUrl) {
    url = baseUrl;
  } else if (v3) {
    url = process.env.API.V3; // eslint-disable-line no-undef
  } else {
    url = process.env.API.V5; // eslint-disable-line no-undef
  }

  if (token) {
    headers.Authorization = `Bearer ${token.tokenV3}`;
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(`${url}${endpoint}`, {
    ...options,
    headers,
  });
}

async function get(endpoint) {
  const response = await doFetch(endpoint);
  const meta = utils.pagination.getResponseHeaders(response);
  const result = await response.json();
  result.meta = meta;

  return result;
}

async function post(endpoint, body) {
  const response = doFetch(endpoint, {
    body,
    method: "POST",
  });
  return response.json();
}

async function put(endpoint, body) {
  const response = doFetch(endpoint, {
    body,
    method: "PUT",
  });
  return response.json();
}

async function patch(endpoint, body) {
  const response = doFetch(endpoint, {
    body,
    method: "PATCH",
  });
  return response.json();
}

export default {
  doFetch,
  get,
  post,
  put,
  patch,
};
