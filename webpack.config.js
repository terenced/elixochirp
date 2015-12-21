"use strict";

var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var root = path.resolve(__dirname, 'web/static/');
var js_dir = path.resolve(root, 'js');
var css_dir = path.resolve(root, 'css');


var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    "app": [path.resolve(css_dir, "app.less"), path.resolve(js_dir, "app.js")],
  },
  output: {
    path: "./priv/static/js",
    filename: "app.js"
  },

  resolve: {
    modulesDirectories: [js_dir],
    alias: {
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [node_modules_dir],
        loader: "babel",
        include: __dirname,
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.jsx$/,
        exclude: [node_modules_dir],
        loaders: ["react-hot", "babel-loader"],
      },
      {
        test: /\.less$/,
        exclude: [node_modules_dir],
        loader: 'style!css!less'
      },

      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: "./web/static/assets" },
      { from: "./deps/phoenix_html/web/static/js/phoenix_html.js",
        to: "js/phoenix_html.js" }
    ])
  ]
};

// if running webpack in production mode, minify files with uglifyjs
if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}
