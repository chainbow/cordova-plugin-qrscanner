'use strict';

const gulp = require('gulp');
const insert = require('gulp-insert');
const fs= require('fs');

const remap = fs.readFileSync('src/common/src/cordova-remap.js', 'utf-8');

function webpack(config, callback){
  const exec = require('child_process').exec;
  exec(__dirname + '/node_modules/.bin/webpack --config ' + config, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    callback(error);
  });
}

exports.prepack = function(cb){
  webpack('webpack.prepack.config.js', cb);
};

exports.webpackCordova = gulp.series(exports.prepack, function(cb){
  webpack('webpack.cordova.config.js', cb);
});

exports.dist = gulp.series(exports.prepack, function(cb){
  webpack('webpack.library.config.js', cb);
});

exports.remap = gulp.series(exports.webpackCordova, function () {
  return gulp.src(['dist/plugin.min.js', 'dist/www.min.js'])
  .pipe(insert.prepend(remap))
  .pipe(gulp.dest('dist'));
});

exports.plugin = gulp.series(exports.remap, function () {
  return gulp.src(['dist/plugin.min.js'])
  .pipe(gulp.dest('src/browser'));
});

exports.www = gulp.series(exports.remap, function () {
  return gulp.src(['dist/www.min.js'])
  .pipe(gulp.dest('www'));
});

exports.default = gulp.series(exports.dist, exports.plugin, exports.www);
