var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('serve', function () {
  browserSync.init({
    server: "./public"
  });

  gulp.watch("sass/**/*.sass", gulp.series('sass'));
  gulp.watch("pug/**/*.pug", gulp.series('pug'));
  gulp.watch("public/js/*.js").on('change', browserSync.reload);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src("sass/**/*.sass")
    .pipe(sass().on('error', sass.logError))
    // .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML() {
  return gulp.src('pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public'))
});

gulp.task('default', gulp.series('serve'))