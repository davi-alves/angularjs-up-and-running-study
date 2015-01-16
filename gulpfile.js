var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch');

gulp.task('connect', function () {
  connect.server({
    livereload: true,
    root: ['.']
  });
});

gulp.task('watch', function () {
  watch('chapter*/**/*')
    .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);
