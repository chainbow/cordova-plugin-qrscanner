const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV
const isProduction = nodeEnv !== 'development'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: {
    worker: path.join(__dirname, './src/browser/src/library.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'cordova-plugin-qrscanner-lib.min.js',
    library: 'QRScanner',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    
  ]
};
