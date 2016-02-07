var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var typescript = require('gulp-typescript');
var tsc = require('typescript');
var babel = require('gulp-babel');

var tsAppProject = typescript.createProject('./app/tsconfig.json', { typescript: tsc });
var tsApiProject = typescript.createProject('./api/tsconfig.json', { typescript: tsc });

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.app.dtsSrc.concat(paths.app.source))
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(changed(paths.app.output, {extension: '.js'}))
    .pipe(typescript(tsAppProject))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.app.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.app.html)
    .pipe(changed(paths.app.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.app.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function() {
  return gulp.src(paths.app.css)
    .pipe(changed(paths.app.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.app.output));
});

gulp.task('build-api-ts', function() {
  return gulp.src(paths.api.dtsSrc.concat(paths.api.source))
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(changed(paths.api.tsOutputRoot, { extension: '.js' }))
    .pipe(typescript(tsApiProject))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(paths.api.tsOutputRoot));
});

gulp.task('build-api-babel', function() {
  return gulp.src(paths.api.tsOutputSource)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(changed(paths.api.output, { extension: '.js' }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(paths.api.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build-app', function(callback) {
  return runSequence(
    'clean-app',
    ['build-system', 'build-html', 'build-css'],
    callback
  );
});

gulp.task('build-api', function(callback) {
  return runSequence(
    'clean-api',
    'build-api-ts',
    'build-api-babel',
    callback
  );
});
