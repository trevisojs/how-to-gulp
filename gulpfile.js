/*==========================================================
How to Gulp
Author: @trevisojs       - https://github.com/trevisojs
Author: @nicholasruggeri - http://ruggeri.io
==========================================================*/


/**
* List gulp dependencies
**/
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cssmin      = require('gulp-cssmin');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var notify      = require("gulp-notify");
var browserSync = require('browser-sync').create();


/**
*
* Styles
* - Catch errors (gulp-plumber)
* - Compile
* - Autoprefixer
* - Minify
*
**/
gulp.task('styles', function() {
  gulp.src('_assets/scss/*.scss')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});


/**
*
* Scripts
* - Catch errors (gulp-plumber)
* - Concat
* - Uglify
*
**/
gulp.task('scripts', function() {
  gulp.src('_assets/js/**/*.js')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('web/js'))
    .pipe(browserSync.stream());
});


/**
*
* Watch assets
* - styles
* - scripts
*
**/
gulp.task('watch', function() {
    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
});


/**
*
* Build assets
* - styles
* - scripts
*
**/
gulp.task('build', ['styles', 'scripts'], function() {
    console.log('build assets')
});


/**
*
* Serve - BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: "./web"
    });
    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});


/**
*
* Default task
* - launch serve
*
**/
gulp.task('default', ['serve']);
