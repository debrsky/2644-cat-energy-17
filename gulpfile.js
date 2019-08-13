"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var htmlmin = require('gulp-htmlmin');

var del = require("del");


gulp.task("webp", function () {
  return gulp.src("source/img-no-opt/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("source/img"));
})


gulp.task("images", function () {
  return gulp.src("source/img-no-opt/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))

    .pipe(gulp.dest("source/img"));
})

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
})

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*.{jpg,webp,png}",
    "source/js/**",
    "source/*.ico",
    "source/preview/**/*.*",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copyAndOptSvg", function () {
  return gulp.src([
    "source/img/**/*.svg",
  ], {
    base: "source"
  })
  .pipe(imagemin([imagemin.svgo()]))
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "copyAndOptSvg",
  "css",
  "sprite",
  "html"
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch(["source/*.html", "source/js/**/*.js"], gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
})

gulp.task("start", gulp.series("build", "server"));
