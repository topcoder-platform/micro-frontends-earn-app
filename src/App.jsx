/**
 * Main App component
 */
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Router, useLocation, redirectTo } from "@reach/router";
import Challenges from "./containers/Challenges";
import Filter from "./containers/Filter";
import Menu from "./components/Menu";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import Button from "./components/Button";
import * as constants from "./constants";
import actions from "./actions";
import * as utils from "./utils";
import store from "./store";
import { initialChallengeFilter } from "./reducers/filter";
import _ from "lodash";

import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import "rc-tooltip/assets/bootstrap.css";

import "./styles/main.scss";

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useLayoutEffect(() => {
    disableSidebarForRoute("/earn/*");
  }, []);

  const menu = (
    <Menu
      menu={constants.NAV_MENU}
      icons={constants.NAV_MENU_ICONS}
      selected={selectedMenuItem}
      onSelect={(item) => {
        setSelectedMenuItem(item);
      }}
    />
  );

  const location = useLocation();

  const getChallengesDebounced = useRef(_.debounce((f) => f(), 500));

  useEffect(() => {
    if (!location.search) {
      store.dispatch(actions.challenges.getChallenges(initialChallengeFilter));
      return;
    }

    //if (location.pathname === "/earn/find/challenges") {
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
    getChallengesDebounced.current(() =>
      store.dispatch(actions.challenges.getChallenges(updatedFilter))
    );
    //}
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
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-content">
          {menu}
          <hr />
          <Filter />
        </div>
        <div className="sidebar-footer">
          <a
            className="button button-primary"
            href="https://github.com/topcoder-platform/micro-frontends-earn-app/issues/new?assignees=&labels=&template=bug_report.md&title="
            target="_blank"
          >
            GIVE APPLICATION FEEDBACK
          </a>
        </div>
      </aside>
      <div className="content">
        <Router>
          <Challenges path="/earn/*" />
        </Router>
      </div>
    </div>
  );
};

export default App;
