// gulp build : for a one off development build
// gulp build --production : for a minified production build

'use strict';

const js_files_skip_optimisation = [
  // Optimise all files
  '**',
  // But skip the following files
  '!static/interactives/huffman-tree/**/*.js',
  '!static/interactives/pixel-viewer/**/*.js',
];

// general
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const gulpif = require('gulp-if');
const filter = require('gulp-filter');
const runSequence = require('run-sequence')
const notify = require('gulp-notify');
const log = require('gulplog');
const buffer = require('vinyl-buffer');
const argv = require('yargs').argv;
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const errorHandler = require('gulp-error-handle');

// sass
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postcssFlexbugFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');

// js
const tap = require('gulp-tap');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserify = require('browserify');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

// gulp build --production
const production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
const build = argv._.length ? argv._[0] === 'build' : true;

// ----------------------------
// Error notification methods
// ----------------------------
var handleError = function(task) {
  return function(err) {
      notify.onError({
        message: task + ' failed, check the logs..',
        sound: false
      })(err);

    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

function catchError(error) {
    gutil.log(
      gutil.colors.bgRed('Error:'),
      gutil.colors.red(error)
    );
    this.emit('end');
}

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
    return gulp.src([
        'static/interactives/**/*',
        '!static/interactives/**/*.scss',
        '!static/interactives/**/*.js'
      ])
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
    return gulp.src('static/**/*.scss')
      .pipe(errorHandler(catchError))
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
      .pipe(sourcemaps.write({
        'includeContent': true
      }))
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace("scss", "css");
      }))
      .pipe(gulp.dest('build/'));
  },
  // --------------------------
  // JavaScript
  // --------------------------
  js: function() {
    const f = filter(js_files_skip_optimisation, {restore: true});
    return gulp.src(['static/**/*.js', '!static/js/modules/**/*.js'])
      .pipe(f)
      .pipe(errorHandler(catchError))
      .pipe(tap(function (file) {
        file.contents = browserify(file.path, {debug: true}).bundle().on('error', catchError);
      }))
      .pipe(buffer())
      .pipe(errorHandler(catchError))
      .pipe(gulpif(production, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(production, terser({keep_fnames: true})))
      .pipe(gulpif(production, sourcemaps.write('./')))
      .pipe(f.restore)
      .pipe(gulp.dest('build'));
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
gulp.task('files', req, tasks.files);
gulp.task('svg', req, tasks.svg);
gulp.task('js', req, tasks.js);
gulp.task('css', req, tasks.css);
gulp.task('sass', req, tasks.sass);

// // build task
gulp.task('build', function(callback) {
  runSequence('clean', ['images', 'svg', 'css', 'sass', 'interactives', 'files', 'js'], callback);
});
