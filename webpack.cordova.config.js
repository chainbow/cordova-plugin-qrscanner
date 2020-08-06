const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV
const isProduction = nodeEnv !== 'development'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: {
    plugin: path.join(__dirname, './src/browser/src/cordova-plugin.js'),
    www: path.join(__dirname, './src/common/src/cordova-www.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].min.js'
  },
  externals: {
    "webpack/cordova": "cordova",
    "webpack/cordova/require": "cordovaRequire",
    "webpack/cordova/exports": "cordovaExports",
    "webpack/cordova/module": "cordovaModule"
  }
}
