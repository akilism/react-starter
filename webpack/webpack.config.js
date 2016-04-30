const autoprefixer = require('autoprefixer');
const path = require("path");
const postcssImport = require('postcss-import');
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const root = path.resolve(__dirname, "../");
const isProduction = (process.env.NODE_ENV !== 'development');

const htmlConfig = {
  title: 'React Starter',
  filename: 'index.html',
  template: `${path.resolve(__dirname, "../src/html")}/index.html`,
  inject: true
};

console.log(path.resolve(__dirname, "../build"));

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
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin(htmlConfig)
  ] :
  [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin(htmlConfig)
  ];
}

function output(isProduction) {
  return (isProduction) ?
  {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: 'bundle.[hash].js'
  } :
  {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    filename: 'bundle.[hash].js'
  };
}

function filename(isProduction) {
    return (isProduction) ? '[name].[chunkhash].js' : '[name].js';
}

module.exports = {
    devtool: '#source-map',
    entry: {
      app: entry(isProduction)
    },
    eslint: {
      formatter: require('eslint-friendly-formatter')
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
          loader: "style!css"
        },
        {
          test: /\.scss$/,
          loader: "style!css?sourceMap!sass?sourceMap"
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
    output: output(isProduction),
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
