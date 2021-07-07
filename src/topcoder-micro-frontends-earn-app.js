import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import appInit from "./utils/lifeCycle";

const appLifecycles = appInit();

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

const bootstrap = [appLifecycles.bootstrap, lifecycles.bootstrap];

const mount = [appLifecycles.mount, lifecycles.mount];

const unmount = [lifecycles.unmount];

export { bootstrap, mount, unmount };
