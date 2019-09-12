'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    console.log(event);
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.viewSrc, '/*.html'), 'client/bower.json'], ['inject-reload']);

  gulp.watch([
    path.join(conf.paths.stylesSrc, '/app/**/*.css'),
    path.join(conf.paths.stylesSrc, '/app/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.clientSrc, '/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.viewSrc, '/partials/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
