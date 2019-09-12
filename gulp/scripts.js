'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    console.log('starting scripts....');
  return buildScripts();
});

function buildScripts() {
  return gulp.src([
      path.join(conf.paths.clientSrc, '/controllers/*.js'),
      path.join(conf.paths.clientSrc, '/directives/*.js'),
      path.join(conf.paths.clientSrc, '/filters/*.js'),
      path.join(conf.paths.clientSrc, '/services/*.js'),
      path.join(conf.paths.clientSrc, '/app.js')
  ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size())
};
