const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BannerPlugin } = require('webpack');
const path = require('path');
const packageInfo = require('./package.json');

module.exports = {
  mode: 'production',
  entry: {
    'books-com-tw-collection-api': './src/index.ts'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: 'dist/',
    filename: './[name].min.js',
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
  ],
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
