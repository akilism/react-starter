import http from "http";
import express from "express";
import expressHandlebars from "express-handlebars";
// import path from "path";

import webpack from "webpack";
import webpackDev from "webpack-dev-middleware";
import webpackHot from "webpack-hot-middleware";
import webpackConfig from "./webpack/webpack.config.js";

import React from "react";
import { renderToString } from "react-dom/server";
import { RouterContext, match } from "react-router";
import { createLocation } from "history/lib/LocationUtils";
import routes from "./src/js/routes";

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

app.get("/", (req, res) => {
  const location = createLocation(req.url);
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end("Internal server error");
    }

    if (!renderProps) return res.status(404).end("Not found.");

    const InitialComponent = (<RouterContext {...renderProps} />);

    const bodyHTML = renderToString(InitialComponent);

    return res.render("index", {
      title: "TEST",
      styles: `
<link href="${webpackConfig.output.path}main.css" media="all" rel="stylesheet" type="text/css"/>
      `,
      bodyHTML,
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
