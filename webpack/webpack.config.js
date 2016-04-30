const autoprefixer = require("autoprefixer");
const path = require("path");
const postcssImport = require("postcss-import");
const precss = require("precss");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

const root = path.resolve(__dirname, "../");
const isProduction = (process.env.NODE_ENV !== "development");

const htmlConfig = {
  title: "React Starter",
  filename: "index.html",
  template: `${path.resolve(__dirname, "../src/html")}/index.html`,
  inject: true
};

console.log(path.resolve(__dirname, "../build"));

function entry(isProduction) {
  return (isProduction) ?
    [ "./src/js/app.js" ] :
    [ "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/js/app.js" ];
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
    new HtmlWebpackPlugin(htmlConfig),
    new ExtractTextWebpackPlugin("dist/[name]-[contenthash].css")
  ] :
  [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin(htmlConfig)
  ];
}

function cssLoader(isProduction) {
  return (isProduction) ? {
    test: /\.css$/,
    loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader", "postcss-loader")
  } :
  {
    test: /\.css$/,
    loader: "style!css!postcss"
  }
}

function sassLoader(isProduction) {
  return (isProduction) ?
  {
    test: /\.scss$/,
    loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader", "postcss-loader", "sass-loader")
  } :
  {
    test: /\.scss$/,
    loader: "style!css?sourceMap!postcss!sass?sourceMap"
  }
}

function output(isProduction) {
  return (isProduction) ?
  {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "bundle.[chunkhash].js"
  } :
  {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    filename: "bundle.js"
  };
}

module.exports = {
    devtool: "#source-map",
    entry: {
      app: entry(isProduction)
    },
    eslint: {
      formatter: require("eslint-friendly-formatter")
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
        cssLoader(isProduction),
        sassLoader(isProduction),
        {
          test: /\.(geo)?json$/,
          loader: "json"
        },
        {
          test: /\.(png|jpe?g|gif|svg|otf|eot|woff2?|ttf)$/,
          loader: "file",
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
