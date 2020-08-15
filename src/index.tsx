import React from "react";
import ReactDOM from "react-dom";

import "aframe-extras";
import "aframe-layout-component";
import "aframe-look-at-component";

// import "./aframe/components";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// latitude: 34.046675799999996, longitude: -118.4513455
