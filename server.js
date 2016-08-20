import http from "http";
import express from "express";
import path from "path";

import webpack from "webpack";
import webpackDev from "webpack-dev-middleware";
import webpackHot from "webpack-hot-middleware";
import webpackConfig from "./webpack/webpack.config.js";

const compiler = webpack(webpackConfig);
const app = express();

// Inject webpack dev and hot reload middleware if in development.
(function(isProduction) {
  if(isProduction) { return; }

  app.use(webpackDev(compiler,
  {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHot(compiler,
  {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
})((process.env.NODE_ENV !== 'development'));

// Static Assets.
app.use(express.static(webpackConfig.output.path));

app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/${webpackConfig.output.path}/index.html`);
});

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 8088, () => {
  console.log("Listening on %j", server.address());
});
