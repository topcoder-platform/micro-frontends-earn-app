/**
 * Main App component
 */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Router, useNavigate } from "@reach/router";
import Challenges from "./containers/Challenges";
import Filter from "./containers/Filter";
import Menu from "./components/Menu";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import AuthDemo from "./components/AuthDemo";
import NoSidebarDemo from "./components/NoSidebarDemo";
import * as constants from "./constants";
import * as utils from "./utils";

import "./styles/react-date-range/default.scss";
import "./styles/react-date-range/styles.scss";

import "./styles/main.scss";

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const navigateTo = useNavigate();

  useLayoutEffect(() => {
    disableSidebarForRoute("/earn/*");
  }, []);

  useEffect(() => {
    const path = utils.menu.getMenuItemUrlPath(
      constants.NAV_MENU,
      selectedMenuItem
    );
    if (path) {
      navigateTo(path);
    }
  }, [selectedMenuItem]);

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

  return (
    <div className="layout">
      <aside className="sidebar">
        {menu}
        <hr />
        <Filter />
      </aside>
      <div className="content">
        <Router>
          <Challenges path="/earn/find/challenges" />
          <NoSidebarDemo path="/earn" />
        </Router>
      </div>
    </div>
  );
};

export default App;
