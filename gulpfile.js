const gulp = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfigDev = require("./webpack.config.js");
const browserSync = require('browser-sync').create();
gulp.task('browserSync:reload', function (done) {
  browserSync.reload();
  done();
});
gulp.task('browserSync', function () {
  browserSync.init({
    open: true,
    port: 8000,
    server: {
      baseDir: "./dist"
    }
  });
});
gulp.task("webpack:build", function () {
  return webpackStream(webpackConfigDev, webpack)
    .on('error', function (e) { this.emit('end'); })
    .pipe(gulp.dest('dist'));
});
gulp.task('webpack:watch', function () {
  gulp.watch(['src/script/**/*'], gulp.series(['webpack:build', 'browserSync:reload']));
});
gulp.task('file:copy', function () {
  return gulp.src(['src/file/**/*'])
    .pipe(gulp.dest('./dist'));
});
gulp.task('file:watch', function () {
  gulp.watch(['src/file/**/*'], gulp.series(['file:copy', 'browserSync:reload']));
});
//--------------------------
gulp.task('default', gulp.parallel([
  'browserSync',
  'webpack:build',
  'webpack:watch',
  'file:copy', 'file:watch']));
