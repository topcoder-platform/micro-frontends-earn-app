import React, { useEffect } from "react";
import { setAppMenu } from "@topcoder/micro-frontends-navbar-app";
import appMenu from "./constants/appMenu";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// History for location provider
const history = createHistory(window);

export default function Root() {
  useEffect(() => {
    // when app starts it should set its side menu structure
    setAppMenu("/earn", appMenu);
  }, []);

  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocationProvider>
  );
}
