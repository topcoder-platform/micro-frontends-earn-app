import React, { useEffect } from "react";
import { Link, Router } from "@reach/router";
import { setAppMenu } from "@topcoder/micro-frontends-navbar-app";
import appMenu from "./constants/appMenu";
import AuthDemo from "./components/AuthDemo";
import NoSidebarDemo from "./components/NoSidebarDemo";

export default function Root() {
  useEffect(() => {
    // when app starts it should set its side menu structure
    setAppMenu("/earn", appMenu);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Earn App Placeholder</h1>

      <Router>
        <AuthDemo path="/earn/find" />
        <AuthDemo path="/earn/auth" />
        <NoSidebarDemo path="/earn/no-sidebar" />
      </Router>
    </div>
  );
}
