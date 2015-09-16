var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('scripts', function() {
  gulp.src('_assets/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('web/js'))
});

gulp.task('styles', function() {
  gulp.src('_assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('web/css'));
});

gulp.task('watch', function() {
    gulp.watch(['_assets/scss/*.scss', '_assets/js/**/*.js'], ['scripts', 'styles']);
});


gulp.task('default', ['scripts', 'styles']);