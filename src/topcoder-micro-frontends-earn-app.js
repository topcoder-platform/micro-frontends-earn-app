import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { bindActionCreators } from "redux";
import Root from "./root.component";
import Banner from "./components/Banner";
import FeedbackButton from "./components/FeedbackButton";
import actions from "./actions/menu";
import store from "./store";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

const bootstrap = [lifecycles.bootstrap];
const mount = [lifecycles.mount];
const unmount = [lifecycles.unmount];

export { bootstrap, mount, unmount };

export { Banner, FeedbackButton };
export const { showMenu } = bindActionCreators(
  { showMenu: actions.showMenu },
  store.dispatch
);
