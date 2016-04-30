const autoprefixer = require('autoprefixer');
const path = require("path");
const postcssImport = require('postcss-import');
const precss = require("precss");
const webpack = require("webpack");

const root = path.resolve(__dirname, "../");
const webRoot = "/build";

function entry(isProduction) {
  return (isProduction) ?
    [ './src/js/app.js' ] :
    [ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/js/app.js' ];
}

function plugins(isProduction) {
  return (isProduction) ?
  [
    // sets React to production mode.
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] :
  [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

function filename(isProduction) {
    return (isProduction) ? '[name].[chunkhash].js' : '[name].js';
}

console.log(path.resolve(__dirname, "../build"));
const isProduction = (process.env.NODE_ENV !== 'development');
module.exports = {
    devtool: '#source-map',
    entry: {
      app: entry(isProduction)
    },
    output: {
      path: path.resolve(__dirname, "../build"),
      publicPath: webRoot,
      filename: 'bundle.js'
    },
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: root,
          loader: "eslint"
        },
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel"
        },
        {
          test: /\.css$/,
          loader: "style!css!postcss"
        },
        {
          test: /\.scss$/,
          loader: "style!css!postcss!sass"
        },
        {
          test: /\.(geo)?json$/,
          loader: "json"
        },
        {
          test: /\.(png|jpe?g|gif|svg|otf|eot|woff2?|ttf)$/,
          loader: 'url',
          query: {
            name: "[name].[hash].[ext]",
          }
        }
      ]
    },
    plugins: plugins(isProduction),
    postcss: function() {
      return [
        autoprefixer,
        precss,
        postcssImport({ addDependencyTo: webpack })
      ];
    },
    sassLoader: {
      includePaths: [path.resolve(__dirname, "../src/styles/")]
    }
  };
