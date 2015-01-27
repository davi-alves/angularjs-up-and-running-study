var gulp = require('gulp'),
  concat = require('gulp-concat'),
  ngHtml2Js = require('gulp-ng-html2js');

gulp.task('default', function () {
  gulp.src("./partials/*.html")
    .pipe(ngHtml2Js({
      moduleName: "myPartials",
      prefix: ""
    }))
    .pipe(gulp.dest("./"));
});
