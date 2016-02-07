var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean-app', function() {
  return gulp.src([paths.app.output])
    .pipe(vinylPaths(del));
});

gulp.task('clean-api', function() {
  return gulp.src([paths.api.output])
    .pipe(vinylPaths(del));
});
