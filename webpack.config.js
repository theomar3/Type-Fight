var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');
var SCSS_DIR = path.resolve(__dirname, 'client/scss');

var config = {
  entry: APP_DIR + '/index.jsx',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'app.bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  sassLoader: {
    includePaths: [SCSS_DIR]
  }
};

module.exports = config;
