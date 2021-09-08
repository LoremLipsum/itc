const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import")
const postcssNested = require("postcss-nested")
const postcssCsso = require("postcss-csso");
const postcssCustomMedia = require('postcss-custom-media');
const autoprefixer = require("autoprefixer");
const svgsprite = require("gulp-svg-sprite");
const nunjucks = require('gulp-nunjucks');
const htmlmin = require("gulp-htmlmin");
const terser = require('gulp-terser');
const webp = require("gulp-webp");
const avif = require('gulp-avif');
const rename = require("gulp-rename");
const del = require("del");
const sync = require("browser-sync").create();

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
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'))
}

exports.njk = njk;

const scripts = () => {
  return gulp.src("source/scripts/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/scripts"))
}

exports.scripts = scripts;

const copyImages = () => {
  return gulp.src("source/assets/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/assets/images"))
}

exports.images = copyImages;

const createWebp = () => {
  return gulp.src("source/assets/images/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/assets/images"))
}

exports.createWebp = createWebp;

const createAvif = () => {
  return gulp.src("source/assets/images/**/*.{jpg,png}")
    .pipe(avif({quality: 90}))
    .pipe(gulp.dest("build/assets/images"))
}

exports.createAvif = createAvif;

const svgSprite = () => {
  return gulp.src("source/assets/icons/**/*.svg")
    .pipe(plumber())
    .pipe(svgsprite({
      mode: {
        stack: {}
      }
    }))
    .pipe(rename("svgsprite.svg"))
    .pipe(gulp.dest("build/assets/icons"));
}

exports.svgSprite = svgSprite;

const copy = () => {
  return gulp.src([
    'source/assets/fonts/**/*',
    'source/favicon.ico',
    'source/manifest.webmanifest'
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
  gulp.watch("source/scripts/**/*.js", scripts);
}

const build = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    njk,
    scripts,
    svgSprite,
    createWebp,
    createAvif
  ),
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    njk,
    scripts,
    svgSprite,
    createWebp,
    createAvif
  ),
  gulp.series(
    server,
    watcher
  )
);
