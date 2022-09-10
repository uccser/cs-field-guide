////////////////////////////////
// Setup
////////////////////////////////

// Gulp and package
const { src, dest, parallel, series, watch, lastRun } = require('gulp')
const pjson = require('./package.json')

// Plugins
const autoprefixer = require('autoprefixer')
const browserify = require('browserify')
const browserSync = require('browser-sync').create()
const buffer = require('vinyl-buffer');
const c = require('ansi-colors')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const dependents = require('gulp-dependents')
const errorHandler = require('gulp-error-handle')
const filter = require('gulp-filter')
const gulpif = require('gulp-if');
const { hideBin } = require('yargs/helpers')
const imagemin = require('gulp-imagemin')
const log = require('fancy-log')
const pixrem = require('pixrem')
const postcss = require('gulp-postcss')
const postcssFlexbugFixes = require('postcss-flexbugs-fixes')
const reload = browserSync.reload
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps')
const spawn = require('child_process').spawn
const tap = require('gulp-tap')
const terser = require('gulp-terser')
const yargs = require('yargs/yargs')

// Arguments
const argv = yargs(hideBin(process.argv)).argv
const PRODUCTION = !!argv.production;

// Relative paths function
function pathsConfig(appName) {
    this.app = `./${pjson.name}`
    const vendorsRoot = 'node_modules/'
    const staticSourceRoot = 'static/'
    const staticOutputRoot = 'build/'

    return {
        app: this.app,
        // Source files
        bootstrap_source: `${vendorsRoot}bootstrap/scss`,
        images_source: `${staticSourceRoot}img`,
        svg_source: `${staticSourceRoot}svg`,
        interactives_source: `${staticSourceRoot}interactives`,
        files_source: `${staticSourceRoot}files`,
        // These directories are scoped higher to catch files in interactives directory
        css_source: `${staticSourceRoot}`,
        scss_source: `${staticSourceRoot}`,
        js_source: `${staticSourceRoot}`,
        // Vendor
        vendor_js_source: [
            `${vendorsRoot}jquery/dist/jquery.js`,
            `${vendorsRoot}popper.js/dist/umd/popper.js`,
            `${vendorsRoot}bootstrap/dist/js/bootstrap.js`,
            `${vendorsRoot}details-element-polyfill/dist/details-element-polyfill.js`,
            `${vendorsRoot}lity/dist/lity.js`,
            `${vendorsRoot}iframe-resizer/js/iframeResizer.js`,
            `${vendorsRoot}multiple-select/dist/multiple-select-es.js`,
        ],
        // Output files
        fonts_output: `${staticOutputRoot}fonts`,
        images_output: `${staticOutputRoot}img`,
        svg_output: `${staticOutputRoot}svg`,
        interactives_output: `${staticOutputRoot}interactives`,
        files_output: `${staticOutputRoot}files`,
        vendor_js_output: `${staticOutputRoot}js`,
        // These directories are scoped higher to output files in interactives directory
        css_output: `${staticOutputRoot}`,
        js_output: `${staticOutputRoot}`,
    }
}

var paths = pathsConfig()

function catchError(error) {
    log.error(
        c.bgRed('Error:'),
        c.red(error)
    );
    this.emit('end');
}

////////////////////////////////
// Config
////////////////////////////////

// CSS/SCSS
const processCss = [
    autoprefixer(),         // adds vendor prefixes
    pixrem(),               // add fallbacks for rem units
    postcssFlexbugFixes(),  // adds flexbox fixes
]
const minifyCss = [
    cssnano({ preset: 'default' })   // minify result
]

// JS

const js_files_skip_optimisation = [
  // Optimise all files
  '**',
  // But skip the following files
  '!static/interactives/huffman-tree/**/*.js',
  '!static/interactives/pixel-viewer/**/*.js',
  '!static/interactives/**/js/third-party/*.js',
];

////////////////////////////////
// Tasks
////////////////////////////////

// Styles autoprefixing and minification
function css() {
    return src([
            `${paths.css_source}/**/*.css`,
            `!${paths.css_source}/**/node_modules/**/*.css`,
        ])
        .pipe(errorHandler(catchError))
        .pipe(sourcemaps.init())
        .pipe(postcss(processCss))
        .pipe(sourcemaps.write())
        .pipe(gulpif(PRODUCTION, postcss(minifyCss))) // Minifies the result
        .pipe(dest(paths.css_output))
}

function scss() {
    return src([
            `${paths.scss_source}/**/*.scss`,
            `!${paths.scss_source}/**/node_modules/**/*.scss`,
        ], { since: lastRun(scss) })
        .pipe(errorHandler(catchError))
        .pipe(dependents())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                paths.bootstrap_source
            ],
            sourceComments: !PRODUCTION,
        }).on('error', sass.logError))
        .pipe(postcss(processCss))
        .pipe(sourcemaps.write())
        .pipe(gulpif(PRODUCTION, postcss(minifyCss))) // Minifies the result
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace("scss", "css");
        }))
        .pipe(dest(paths.css_output))
}

// Javascript
function js() {
    const js_filter = filter(js_files_skip_optimisation, { restore: true })
    return src([
            `${paths.js_source}/**/*.js`,
            `!${paths.js_source}/**/modules/**/*.js`,
            `!${paths.js_source}/**/node_modules/**/*.js`
        ], {since: lastRun(js)})
        .pipe(js_filter)
        .pipe(errorHandler(catchError))
        .pipe(sourcemaps.init())
        .pipe(tap(function (file) {
            file.contents = browserify(file.path, { debug: true }).bundle().on('error', catchError);
        }))
        .pipe(buffer())
        .pipe(gulpif(PRODUCTION, terser({ keep_fnames: true })))
        .pipe(sourcemaps.write())
        .pipe(js_filter.restore)
        .pipe(dest(paths.js_output))
}

// Vendor Javascript (always minified)
function vendorJs() {
    return src(paths.vendor_js_source)
        .pipe(errorHandler(catchError))
        .pipe(concat('vendors.js'))
        .pipe(terser())
        .pipe(dest(paths.vendor_js_output))
}

// Image compression
function img() {
    return src(`${paths.images_source}/**/*`)
        .pipe(gulpif(PRODUCTION, imagemin())) // Compresses PNG, JPEG, GIF and SVG images
        .pipe(dest(paths.images_output))
}

// SVGs
function svg() {
    return src(`${paths.svg_source}/**/*`)
        .pipe(dest(paths.svg_output))
}

// Interactive files (not SCSS or JS)
function interactives() {
    return src([
            `${paths.interactives_source}/**/*`,
            `!${paths.interactives_source}/**/node_modules/**/*`,
            `!${paths.interactives_source}/**/*.scss`,
            `!${paths.interactives_source}/**/*.js`
        ])
        .pipe(dest(paths.interactives_output))
}

// Downloadable files
function files() {
    return src(`${paths.files_source}/**/*`)
        .pipe(dest(paths.files_output))
}

// Watch
function watchPaths() {
    watch([`${paths.js_source}**/*.js`], js).on("change", reload)
    watch([`${paths.css_source}/*/*.css`], css).on("change", reload)
    watch([`${paths.scss_source}**/*.scss`], scss).on("change", reload)
    watch([`${paths.images_source}**/*`], img).on("change", reload)
}

// Generate all assets
const generateAssets = series(
    parallel(
        css,
        scss,
        vendorJs,
        img,
        svg,
        interactives,
        files
    ),
    js
)

const dev = parallel(
    // initBrowserSync,
    watchPaths
)
// TODO: Look at cleaning build folder
exports["generate-assets"] = generateAssets
exports["dev"] = dev
exports.default = series(generateAssets, dev)
