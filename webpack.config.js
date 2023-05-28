const { BannerPlugin } = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path");
const packageInfo = require("./package.json");

const DEVELOPMENT = "development";
const PRODUCTION = "production";

/** @type {import('webpack').Configuration} */
const commonConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    "books-com-tw-crawler": "./src/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: process.env.NODE_ENV === PRODUCTION ? "./[name].min.js" : "./[name].js",
    library: "books-com-tw-crawler",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new BannerPlugin({
      banner: `@banner Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`,
    }),
  ],
};

/** @type {import('webpack').Configuration} */
const prodConfig = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
              comments: /@banner/i,
          },
        },
        extractComments: false,
      }),
    ],
  },
};

const runBeforeWebpack = () => {
  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      return commonConfig;
    case PRODUCTION:
      return Object.assign({}, commonConfig, prodConfig);
    default:
      throw new Error(`process.env.NODE_ENV does NOT match with "${DEVELOPMENT}" or "${PRODUCTION}".`);
  }
};

module.exports = runBeforeWebpack;
