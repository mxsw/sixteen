var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var brfs = require('brfs');

//  js
var jsCustomOpts = {
    entries: ['./src/js/main.js'],
    debug: true
};

var jsOpts = assign({}, watchify.args, jsCustomOpts);
var jsBrowserify = watchify(browserify(jsOpts));

var jsBundle = function() {
    return jsBrowserify.transform('brfs')
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error js'))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
};

jsBrowserify.on('update', jsBundle);
jsBrowserify.on('log', gutil.log);
gulp.task('js', jsBundle);
