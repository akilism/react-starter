import http from "http";
import express from "express";
import expressHandlebars from "express-handlebars";
import _ from 'mori';

import webpack from "webpack";
import webpackDev from "webpack-dev-middleware";
import webpackHot from "webpack-hot-middleware";
import webpackConfig from "./webpack/webpack.config.js";

import React from "react";
import { renderToString } from "react-dom/server";
import { RouterContext, match } from "react-router";
import { createLocation } from "history/lib/LocationUtils";
import routes from "./src/js/routes";
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './src/js/state/reducers';

const compiler = webpack(webpackConfig);

const app = express();
app.engine(".hbs", expressHandlebars({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Inject webpack dev and hot reload middleware if in development.
(function loadDev(isProduction) {
  if (isProduction) { return; }

  app.use(webpackDev(compiler,
    {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

  app.use(webpackHot(compiler,
    {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    }));
}((process.env.NODE_ENV !== "development")));

// Static Assets.
app.use(express.static(webpackConfig.output.path));
app.use("/assets", express.static("./src/assets"));

// console.log('wpconfig:', webpackConfig);

app.get("/", (req, res) => {
  const location = createLocation(req.url);
  const reducer = combineReducers(reducers);
  const store = createStore(reducer, applyMiddleware(thunk));

  match({ routes: routes(), location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end("Internal server error");
    }

    if (!renderProps) return res.status(404).end("Not found.");

    const InitialComponent = (
      <Provider store={ store }>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const initialState = _.reduceKV((acc, k, v) => {
      const reducerState = {};
      reducerState[k] = _.toJs(v);
      return Object.assign({}, acc, reducerState);
    }, {}, _.toClj(store.getState()));
    const bodyHTML = renderToString(InitialComponent);

    return res.render("index", {
      title: "TEST",
      styles: (process.env.NODE_ENV === "development") ? '' : `
<link href="${webpackConfig.output.publicPath}bundle.css" media="all" rel="stylesheet" type="text/css"/>
      `,
      bodyHTML,
      initialState: JSON.stringify(_.toJs(initialState)),
      scripts: `
<script src="${webpackConfig.output.publicPath}${webpackConfig.output.filename}"></script>
      `
    });
  });
});

app.get("/test", (req, res) => {
  res.send("Hello :8(");
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8088, () => {
  console.log("Listening on %j", server.address());
});
