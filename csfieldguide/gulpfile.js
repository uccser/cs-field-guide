// gulp build : for a one off development build
// gulp build --production : for a minified production build

'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var exec = require('child_process').exec;
var runSequence = require('run-sequence')
var notify = require('gulp-notify');
var log = require('gulplog');
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssFlexbugFixes = require('postcss-flexbugs-fixes');
var autoprefixer = require('autoprefixer');

// js
var tap = require('gulp-tap');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// gulp build --production
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : true;

// ----------------------------
// Error notification methods
// ----------------------------
var beep = function() {
  var os = require('os');
  var file = 'gulp/error.wav';
  if (os.platform() === 'linux') {
    // linux
    exec("aplay " + file);
  } else {
    // mac
    console.log("afplay " + file);
    exec("afplay " + file);
  }
};
var handleError = function(task) {
  return function(err) {
    beep();

      notify.onError({
        message: task + ' failed, check the logs..',
        sound: false
      })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

// --------------------------
// CUSTOM TASK METHODS
// --------------------------
var tasks = {
  // --------------------------
  // Delete build folder
  // --------------------------
  clean: function() {
    return del(['build/']);
  },
  // --------------------------
  // Copy static images
  // --------------------------
  images: function() {
    return gulp.src('static/img/**/*')
      .pipe(gulp.dest('build/img'));
  },
  // --------------------------
  // Copy interactive files
  // --------------------------
  interactives: function() {
    return gulp.src(['static/interactives/**/*', '!static/interactives/**/*.scss'])
      .pipe(gulp.dest('build/interactives'));
  },
  // --------------------------
  // Copy downloadable files
  // --------------------------
  files: function() {
    return gulp.src('static/files/**/*')
      .pipe(gulp.dest('build/files'));
  },
  // --------------------------
  // Copy SVG files
  // --------------------------
  svg: function() {
    return gulp.src('static/svg/**/*')
      .pipe(gulp.dest('build/svg'));
  },
  // --------------------------
  // CSS
  // --------------------------
  css: function() {
    return gulp.src('static/css/**/*.css')
      .pipe(gulp.dest('build/css'));
  },
  // --------------------------
  // SASS (libsass)
  // --------------------------
  sass: function() {
    return gulp.src('static/scss/*.scss')
      // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      // autoprefixer
      .pipe(gulpif(!production, sourcemaps.init({
        'loadMaps': true
      })))
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']}), postcssFlexbugFixes]))
      // we don't serve the source files
      // so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({
        'includeContent': true
      }))
      // write sourcemaps to a specific directory
      // give it a file and save
      .pipe(gulp.dest('build/css'));
  },
  // --------------------------
  // SASS (libsass) for interactives
  // TODO: Remove duplication of logic in this file
  // --------------------------
  interactives_sass: function() {
    return gulp.src('static/interactives/**/scss/*.scss')
      // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      // autoprefixer
      .pipe(gulpif(!production, sourcemaps.init({
        'loadMaps': true
      })))
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']}), postcssFlexbugFixes]))
      // we don't serve the source files
      // so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({
        'includeContent': true
      }))
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace("/scss", "/css");
      }))
      .pipe(gulp.dest('build/interactives'));
  },
  // --------------------------
  // JavaScript
  // Based off https://github.com/gulpjs/gulp/blob/master/docs/recipes/
  // Recipe: browserify-multiple-destination.md
  // --------------------------
  js: function() {
    return gulp.src('static/js/**/*.js', {read: false})
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .on('error', function() { beep(); })
      .pipe(tap(function (file) {
        log.info('bundling ' + file.path);
        file.contents = browserify(file.path, {debug: true}).bundle();
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('build/js'));
  },
};

// // --------------------------
// // CUSTOMS TASKS
// // --------------------------
gulp.task('clean', tasks.clean);
// // for production we require the clean method on every individual task
var req = [];
// // individual tasks
gulp.task('images', req, tasks.images);
gulp.task('interactives', req, tasks.interactives);
gulp.task('interactives_sass', req, tasks.interactives_sass);
gulp.task('files', req, tasks.files);
gulp.task('svg', req, tasks.svg);
gulp.task('js', req, tasks.js);
gulp.task('css', req, tasks.css);
gulp.task('sass', req, tasks.sass);

// // build task
gulp.task('build', function(callback) {
  runSequence('clean', ['images', 'svg', 'css', 'js', 'sass', 'interactives', 'interactives_sass', 'files'], callback);
});
