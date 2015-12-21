var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./web/static/js/app.js", "./web/static/css/app.css"],
  output: {
    path: "./priv/static/js",
    filename: "app.js"
  },

  resolve: {
    modulesDirectories: [__dirname + "/web/static/js"],
    alias: {
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        include: __dirname
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css")
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin("css/app.css")
    new CopyWebpackPlugin([{ from: "./web/static/assets" }])
  ]
};
