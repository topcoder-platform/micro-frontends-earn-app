/**
 * This component demonstrates how we can disable sidebar for some subroutes.
 *
 * For example this component disables sidebar for routes "/micro-frontends-react-route/no-sidebar/*".
 */
import React, { useLayoutEffect } from "react";
import {
  disableSidebarForRoute,
  enableSidebarForRoute,
} from "@topcoder/micro-frontends-navbar-app";

const COMPONENT_ROUTE = "/earn/*";

const NoSidebarDemo = () => {
  // use "useLayoutEffect" to remove the sidebar as early as possible
  // without waiting the component to be rendered
  useLayoutEffect(() => {
    disableSidebarForRoute(COMPONENT_ROUTE);
  }, []);

  return (
    <>
      <h2>Welcome!</h2>
    </>
  );
};

export default NoSidebarDemo;
