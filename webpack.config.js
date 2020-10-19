const MinifyPlugin = require("babel-minify-webpack-plugin");
const fs = require("fs");
const ip = require("ip");
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const PLUGINS = [
  new webpack.EnvironmentPlugin(["NODE_ENV"]),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "public"),
        to: path.resolve(__dirname, "build"),
      },
    ],
  }),
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = {
  devServer: {
    disableHostCheck: true,
    hotOnly: true,
  },
  entry: {
    build: "./src/index.ts",
  },
  output: {
    path: __dirname,
    filename: "build/[name].js",
  },
  plugins: PLUGINS,
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "aframe-super-hot-loader"],
      },
      {
        test: /\.html/,
        exclude: /(node_modules)/,
        use: [
          "aframe-super-hot-html-loader",
          {
            loader: "super-nunjucks-loader",
            options: {
              globals: {
                HOST: ip.address(),
                IS_PRODUCTION: process.env.NODE_ENV === "production",
              },
              path: process.env.NUNJUCKS_PATH || path.join(__dirname, "src"),
            },
          },
          {
            loader: "html-require-loader",
            options: {
              root: path.resolve(__dirname, "src"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|\.jpg/,
        exclude: /(node_modules)/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [".ts", ".js", ".json"],
  },
};
