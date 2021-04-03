import { createActions } from "redux-actions";

function restoreFilter (filter) {
  return filter;
}

function updateFilter(partialUpdate) {
  return partialUpdate;
}

export default createActions({
  RESTORE_FILTER: restoreFilter,
  UPDATE_FILTER: updateFilter,
});
