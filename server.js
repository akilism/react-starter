import http from "http";
import express from "express";

import webpack from "webpack";
import webpackDev from "webpack-dev-middleware";
import webpackHot from "webpack-hot-middleware";
import webpackConfig from "./webpack/webpack.config.js";

const compiler = webpack(webpackConfig);
const app = express();

(function() {
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
})();

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/src/html/index.html');
});

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 8088, () => {
  console.log("Listening on %j", server.address());
});
