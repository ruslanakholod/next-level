const gulp = require('gulp'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      concat = require('gulp-concat'),
      cleanCSS = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      babel = require('gulp-babel');

gulp.task('scss', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/temp/css'))
});

gulp.task('css', ['scss'], function() {
  return gulp.src('./src/temp/css/*.css')
    .pipe(concat('style.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/styles'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src([
    './*.html',
    './src/html/**/*.html'
  ])
  .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src([
    './src/**/*.js'
  ])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    port: 8080,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(['./src/temp/css/*.css'], ['css']);
  gulp.watch(['./src/scss/*.scss'], ['scss']);
  gulp.watch(['./**/*.html'], ['html']);
  gulp.watch(['./src/js/*.js'], ['js']);
  
});

gulp.task('default', ['scss', 'html', 'js', 'css', 'connect', 'watch']);
