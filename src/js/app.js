import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes";
require("normalize.css");
require("../styles/main.scss");

// For hot reloading.
if (module.hot) { module.hot.accept(); }

ReactDOM.render(<Router />, document.getElementById("app"));
