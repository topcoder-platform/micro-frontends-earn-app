/**
 * Main App component
 */
import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Router, useLocation, Redirect } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";
import { usePreviousLocation } from "./utils/hooks";
import Parcel from "single-spa-react/parcel";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

import "./styles/main.scss";

import Menu from "./containers/Menu";

const App = () => {
  const menuVisible = useSelector((state) => state.menu.show);

  useLayoutEffect(() => {
    disableSidebarForRoute("/earn/*");
    document.title = "Listings-EARN-Topcoder";
  }, []);

  const location = useLocation();
  const previousLocation = usePreviousLocation();

  const varsRef = useRef();
  varsRef.current = { previousLocation };

  useEffect(() => {
    if (location.pathname !== varsRef.current.previousLocation.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {menuVisible &&
        ReactDOM.createPortal(<Menu />, document.querySelector("#menu-id"))}
      <Router>
        <Parcel
          path="/earn/find/challenges/*"
          config={() =>
            System.import("@topcoder/micro-frontends-challenges-app")
          }
        />
        <Parcel
          path="/earn/gigs"
          view="gigs"
          config={() => System.import("@topcoder/micro-frontends-gigs-app")}
        />
        <Parcel
          path="/earn/my-gigs"
          view="my-gigs"
          config={() => System.import("@topcoder/micro-frontends-gigs-app")}
        />
      </Router>
    </>
  );
};

export default App;
