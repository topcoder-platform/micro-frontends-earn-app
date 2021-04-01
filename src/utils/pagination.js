export function pageToPageIndex(page) {
  return page - 1;
}

export function pageIndexToPage(pageIndex) {
  return pageIndex + 1;
}

/**
 * @param {any} response Web APIs Response
 * @return {Object} pagination data
 */
export function getResponseHeaders(reponse) {
  return {
    page: +(reponse.headers.get("X-Page") || 0),
    perPage: +(reponse.headers.get("X-Per-Page") || 0),
    total: +(reponse.headers.get("X-Total") || 0),
    totalPages: +(reponse.headers.get("X-Total-Pages") || 0),
  };
}
