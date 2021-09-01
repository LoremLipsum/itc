const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import")
const postcssNested = require("postcss-nested")
const postcssCsso = require("postcss-csso");
const postcssCustomMedia = require('postcss-custom-media');
const autoprefixer = require("autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const sync = require("browser-sync").create();
const nunjucks = require('gulp-nunjucks');

const styles = () => {
  return gulp.src("source/styles/styles.css")
    .pipe(plumber())
    .pipe(postcss(() => ({
      plugins: [
        postcssImport(),
        postcssNested(),
        postcssCustomMedia(),
        postcssCsso(),
        autoprefixer()
      ],
    })))
    .pipe(gulp.dest("build/styles"))
}

exports.styles = styles;

const njk = () => {
  return gulp.src("source/pages/*.html")
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('./build'))
}

exports.njk = njk;

const optimizeImages = () => {
  return gulp.src("source/assets/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/assets/images"))
}

exports.images = optimizeImages;

const copyImages = () => {
  return gulp.src("source/assets/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/assets/images"))
}

exports.images = copyImages;

const copy = () => {
  return gulp.src([
    'source/assets/fonts/**/*'
  ], {
    base: 'source'
  }).pipe(gulp.dest('build/'));
}

exports.copy = copy;

const clean = () => {
  return del("build");
};

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  sync.watch('./build/**/*.*')
    .on('change', sync.reload);
  done();
}

exports.server = server;

const watcher = () => {
  gulp.watch("source/styles/**/*.css", styles);
  gulp.watch("source/images/*.{jpg,png,svg}", copyImages);
  gulp.watch("source/pages/**/*.html", njk);
}

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    njk
  ),
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    njk
  ),
  gulp.series(
    server,
    watcher
  )
);
