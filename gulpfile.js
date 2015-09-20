var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  gulp.src('_assets/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(gulp.dest('web/css'))
    .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
  gulp.src('_assets/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('web/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
});


gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: "./web"
    });

    gulp.watch('_assets/scss/**/*.scss', ['styles']);
    gulp.watch('_assets/js/**/*.js', ['scripts']);
    gulp.watch("web/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);

