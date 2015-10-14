/*==========================================================
How to Gulp
Author: @trevisojs       - https://github.com/trevisojs
Author: @nicholasruggeri - http://ruggeri.io
==========================================================*/


/**
* List gulp dependencies
**/
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    sourcemaps  = require('gulp-sourcemaps'),
    htmlmin     = require('gulp-htmlmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber'),
    notify      = require("gulp-notify"),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    del         = require('del'),
    gulpif      = require('gulp-if'),
    browserSync = require('browser-sync').create();


var prod = false; // var for production mode


/**
*
* Styles
* - Catch errors (gulp-plumber)
* - Compile with 'compressed' output if prod
* - Autoprefixer
*
**/
gulp.task('styles', function() {
    del.sync('web/css');
    gulp.src('_assets/scss/*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: prod ? 'compressed' : 'expanded'}))
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
* - Uglify if prod
*
**/
gulp.task('scripts', function() {
    del.sync('web/js');
    gulp.src('_assets/js/**/*.js')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(concat('scripts.js'))
        .pipe(gulpif(prod, uglify()))
        .pipe(gulp.dest('web/js'))
        .pipe(browserSync.stream());
});


/**
*
* Images
* - Image optimization if prod
*
**/
gulp.task('images', function () {
    del.sync('web/img');
    gulp.src('_assets/img/**/*')
        .pipe(gulpif(prod, imagemin({
            progressive: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest('web/img'));
});


/**
*
* Html
* - copy html
* - minify html if prod
*
**/
gulp.task('html', function() {
    del.sync('web/**/*.html');
    gulp.src('_views/**/*.html')
        .pipe(gulpif(prod, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('web'))
});


/**
*
* Watch assets
*
**/
gulp.task('watch', function() {
    gulp.watch('_views/**/*.html', ['html']);
    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
    gulp.watch('_assets/img/**/*', ['images']);
});


/**
*
* Build task
*
**/
gulp.task('build', function() {
    gulp.start('html', 'styles', 'scripts', 'images');
});


/**
*
* Serve - BrowserSync.io
* - Watch CSS, JS, IMG & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: "./web"
    });
    gulp.watch('_views/**/*.html', ['html']);
    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
    gulp.watch('_assets/img/**/*', ['images']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});


/**
* Gulp Prod
* - build all the assets in production env
*/
gulp.task('prod', function(){
    prod = true;
    gulp.start('build');
});

/**
*
* Default task
* - launch serve
*
**/
gulp.task('default', ['serve']);
