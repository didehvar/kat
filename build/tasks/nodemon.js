var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var paths = require('../paths');

gulp.task('nodemon', ['build-api'], function() {
  nodemon({
    script: paths.api.output + 'server.js',
    ignore: [
      'app/',
      'build/',
      'dist/app/',
      'jspm_packages/',
      'node_modules/',
      'styles/',
      'test/'
    ]
  });
});
