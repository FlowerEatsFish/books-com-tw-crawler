const { BannerPlugin } = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const packageInfo = require('./package.json');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const commonConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    'books-com-tw-collection-api': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV === PRODUCTION ? './[name].min.js' : './[name].development.js',
    library: 'books-com-tw-collection-api',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new BannerPlugin({
      banner: `Repository: ${packageInfo.name} | Version: ${packageInfo.version} | Author: ${packageInfo.author} | License: ${packageInfo.license}`
    })
  ]
};

const prodConfig = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
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
