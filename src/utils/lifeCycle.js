import store from "../store";
import action from "../actions/initApp";
import * as utils from "../utils";

export default function appInit() {
  let initialQuery;
  let urlPath;

  function bootstrap() {
    return Promise.resolve().then(() => {
      initialQuery = window.location.search;
      urlPath = window.location.pathname;
    });
  }

  function mount() {
    if (initialQuery && urlPath.startsWith("/earn/find/challenges")) {
      const params = utils.url.parseUrlQuery(initialQuery);
      const filter = utils.challenge.createChallengeFilter(params);
      store.dispatch(action.initApp(filter));
    }

    return Promise.resolve();
  }

  function unmount() {
    return Promise.resolve();
  }

  return { bootstrap, mount, unmount };
}
