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
var buffer = require('vinyl-buffer');
var argv = require('yargs').argv;

// sass
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssFlexbugFixes = require('postcss-flexbugs-fixes');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// linting
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
  // CSS
  // --------------------------
  css: function() {
    return gulp.src('static/css/**/*.css')
      .pipe(gulp.dest('build/css'));
  },
  // --------------------------
  // JS
  // --------------------------
  js: function() {
    return gulp.src('static/js/**/*.js')
      .pipe(gulp.dest('build/js'));
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
  // linting
  // --------------------------
  lintjs: function() {
    return gulp.src([
        'gulpfile.js',
        'static/js/index.js',
        'static/js/**/*.js'
      ]).pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .on('error', function() {
        beep();
      });
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
gulp.task('js', req, tasks.js);
gulp.task('css', req, tasks.css);
gulp.task('sass', req, tasks.sass);
gulp.task('lint:js', tasks.lintjs);

// // build task
gulp.task('build', function(callback) {
  runSequence('clean', ['images', 'css', 'js', 'sass'], callback);
});
