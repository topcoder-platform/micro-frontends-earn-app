/**
 * Main App component
 */
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Router, useLocation, Redirect } from "@reach/router";
import Challenges from "./containers/Challenges";
import Filter from "./containers/Filter";
import MyGigsFilter from "./containers/MyGigsFilter";
import MyGigs from "./containers/MyGigs";
import Menu from "./components/Menu";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import * as constants from "./constants";
import actions from "./actions";
import * as utils from "./utils";
import store from "./store";
import { initialChallengeFilter, initialGigFilter } from "./reducers/filter";
import _ from "lodash";
import { usePreviousLocation } from "./utils/hooks";
import { useSelector } from "react-redux";

import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-responsive-modal/styles.css";

import "./styles/main.scss";

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const isLoggedIn = useSelector((state) => state.lookup.isLoggedIn);

  useLayoutEffect(() => {
    disableSidebarForRoute("/earn/*");
  }, []);

  const menu = (
    <Menu
      menu={constants.NAV_MENU}
      selected={selectedMenuItem}
      onSelect={(item) => {
        setSelectedMenuItem(item);
        if (item == "Gigs") {
          window.location.href = `${process.env.URL.BASE}/gigs`;
        }
      }}
      isLoggedIn={isLoggedIn}
    />
  );

  const location = useLocation();
  const previousLocation = usePreviousLocation();

  const getDataDebounced = useRef(_.debounce((f) => f(), 500));

  useEffect(() => {
    store.dispatch(actions.lookup.checkIsLoggedIn());
  }, []);

  useEffect(() => {
    if (location.pathname === "/earn/find/challenges") {
      document.title = "Listings-Earn-Topcoder";
      if (!location.search) {
        store.dispatch(
          actions.challenges.getChallenges(initialChallengeFilter)
        );
        return;
      }

      const params = utils.url.parseUrlQuery(location.search);
      const toUpdate = utils.challenge.createChallengeFilter(params);

      if (!toUpdate.types) toUpdate.types = [];
      if (!toUpdate.tracks) toUpdate.tracks = [];
      if (!toUpdate.bucket) toUpdate.bucket = "";

      const updatedFilter = { ...initialChallengeFilter, ...toUpdate };
      const currentFilter = store.getState().filter.challenge;
      const diff = !_.isEqual(updatedFilter, currentFilter);
      if (diff) {
        store.dispatch(actions.filter.updateFilter(updatedFilter));
      }
      getDataDebounced.current(() =>
        store.dispatch(actions.challenges.getChallenges(updatedFilter))
      );
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/earn/my-gigs" && isLoggedIn) {
      document.title =
        "Welcome to the Topcoder Platform. Get started by opening an app in the tool switcher on the top right corner";
      if (!location.search) {
        store.dispatch(actions.filter.updateGigFilter(initialGigFilter));
        const cachedGigs = store.getState().myGigs[initialGigFilter.status];
        if (cachedGigs.myGigs && cachedGigs.myGigs.length !== 0) {
          return;
        }
        store.dispatch(
          actions.myGigs.getMyOpenGigs(
            constants.GIGS_FILTER_STATUSES_PARAM[initialGigFilter.status]
          )
        );
        return;
      }
      const params = utils.url.parseUrlQuery(location.search);
      if (_.keys(params).length == 1 && params.externalId) {
        store.dispatch(actions.myGigs.startCheckingGigs(params.externalId));
        return;
      }
      const s =
        _.values(constants.GIGS_FILTER_STATUSES).indexOf(params.status) >= 0
          ? params.status
          : null;
      const updatedGigFilter = {
        status: s || "Open Applications",
      };
      const currentGig = store.getState().filter.gig;
      const diff = !_.isEqual(updatedGigFilter, currentGig);
      if (diff) {
        store.dispatch(actions.filter.updateGigFilter(updatedGigFilter));
      }
      if (updatedGigFilter.status !== initialGigFilter.status) {
        // preload the open application first page data.
        const cachedOpenGigs = store.getState().myGigs[initialGigFilter.status];
        if (!cachedOpenGigs.myGigs) {
          store.dispatch(
            actions.myGigs.getMyOpenGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[initialGigFilter.status]
            )
          );
        }
      }
      const cachedGigs = store.getState().myGigs[updatedGigFilter.status];
      if (cachedGigs.myGigs) {
        return;
      }
      getDataDebounced.current(() => {
        if (
          updatedGigFilter.status == constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyActiveGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status == constants.GIGS_FILTER_STATUSES.OPEN_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyOpenGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status ==
          constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyCompletedGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
        if (
          updatedGigFilter.status ==
          constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS
        ) {
          store.dispatch(
            actions.myGigs.getMyArchivedGigs(
              constants.GIGS_FILTER_STATUSES_PARAM[updatedGigFilter.status]
            )
          );
        }
      });
    }
  }, [location, isLoggedIn]);

  const varsRef = useRef();
  varsRef.current = { previousLocation };

  useEffect(() => {
    if (location.pathname !== varsRef.current.previousLocation.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const name = utils.menu.getNameByPath(
      constants.NAV_MENU,
      location.pathname
    );
    if (name) {
      setSelectedMenuItem(name);
    } else {
      setSelectedMenuItem(null);
    }
  }, [location]);

  return (
    <>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-content">
            {menu}
            <hr />
            {location.pathname === "/earn/find/challenges" && <Filter />}
            {location.pathname === "/earn/my-gigs" && <MyGigsFilter />}
          </div>
          <div className="sidebar-footer">
            <a
              className="button"
              href="https://discussions.topcoder.com/discussion/8870/new-beta-site-discuss?new=1"
              target="_blank"
            >
              GIVE APPLICATION FEEDBACK
            </a>
          </div>
        </aside>
        <div className="content">
          <Router>
            <Challenges path="/earn/find/challenges" />
            <MyGigs path="/earn/my-gigs" />
            <Redirect from="/earn/*" to="/earn/find/challenges" noThrow />
          </Router>
        </div>
      </div>
      <div id="tooltips-container-id" />
    </>
  );
};

export default App;
