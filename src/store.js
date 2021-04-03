/**
 * Configure Redux Store
 */
import { createStore, compose, applyMiddleware } from "redux";
import { createPromise } from "redux-promise-middleware";
import root from "./reducers";
import actions from './actions'
import * as util from './utils/session'

const middlewares = [
  createPromise({ promiseTypeSuffixes: ["INIT", "DONE", "FAILURE"] }),
];

// eslint-disable-next-line no-undef
if (process.env.APPMODE === "development") {
  const logger = require("redux-logger").createLogger();
  middlewares.push(logger);
}

const store = createStore(root, compose(applyMiddleware(...middlewares)));

store.dispatch(actions.filter.restoreFilter(util.restoreFilter()));

export default store;
