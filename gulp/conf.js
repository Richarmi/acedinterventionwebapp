/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  clientSrc: 'client',
  viewSrc: 'client/templates',
  stylesSrc: 'design/prototype2/src',
  dist: 'client/dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */

exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
  directory: 'client/bower_components',
  bowerJson: require("../client/bower.json"),
  dependencies: true
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

/*
 onError: function(err) {
 console.log('error in wiredep');
 console.log(err)
 // If not overridden, an error will throw.

 // err = Error object.
 // err.code can be:
 //   - "PKG_NOT_INSTALLED" (a Bower package was not found)
 //   - "BOWER_COMPONENTS_MISSING" (cannot find the `bower_components` directory)
 },

 onFileUpdated: function(filePath) {
 // filePath = 'name-of-file-that-was-updated'
 console.log('file updated...');
 console.log(filePath);
 },

 onPathInjected: function(fileObject) {
 console.log('path injected...');
 console.log(fileObject);
 // fileObject.block = 'type-of-wiredep-block' ('js', 'css', etc)
 // fileObject.file = 'name-of-file-that-was-updated'
 // fileObject.path = 'path-to-file-that-was-injected'
 },

 onMainNotFound: function(pkg) {
 console.log('package main not found...');
 console.log(pkg);
 // pkg = 'name-of-bower-package-without-main'
 }
 */