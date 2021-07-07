import { createActions } from "redux-actions";

function initApp(initialFilter) {
  return initialFilter;
}

export default createActions({
  INIT_APP: initApp,
});
