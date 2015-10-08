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
var prefix      = require('gulp-autoprefixer');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var notify      = require("gulp-notify");
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();


/**
*
* Styles
* - Catch errors (gulp-plumber)
* - Compile with 'compressed' output
* - Autoprefixer
*
**/
gulp.task('styles', function() {
    gulp.src('_assets/scss/*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(prefix())
        .pipe(sourcemaps.write())
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
* Images
* - Image optimization
*
**/
gulp.task('images', function () {
    gulp.src('_assets/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('web/img'));
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
    gulp.watch('_assets/img/**/*', ['images']);
});


/**
*
* Build assets
* - styles
* - scripts
*
**/
gulp.task('build', ['styles', 'scripts', 'images'], function() {
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
    gulp.watch('_assets/img/**/*', ['images']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});


/**
*
* Default task
* - launch serve
*
**/
gulp.task('default', ['serve']);
