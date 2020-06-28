var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var browser_sync = require('browser-sync');
const del = require('del');

// BrowserSync
function browserSync(done) {
  browser_sync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 4000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browser_sync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// CSS task
function css() {
  return gulp
		.src('src/styles/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(csso())
		.pipe(gulp.dest('assets/css/'));
}

// Fonts task
function fonts(){
	return gulp
		.src('src/fonts/**/*.{ttf,woff,woff2}')
		.pipe(plumber())
		.pipe(gulp.dest('assets/fonts/'));
}

// Optimize Images
function images() {
	return gulp
		.src('src/img/**/*.{jpg,png,gif}')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img/'));
}

// Scripts task
function scripts(){
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));;
}

function watchFiles() {
	gulp.watch('src/styles/**/*.scss', gulp.series(css, jekyll, browserSyncReload));
	gulp.watch('src/js/**/*.js', scripts);
	gulp.watch('src/fonts/**/*.{tff,woff,woff2}', fonts);
	gulp.watch('src/img/**/*.{jpg,png,gif}', images);
	gulp.watch(
		[
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*"
    ],
    gulp.series(jekyll, browserSyncReload)
	);
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// define complex tasks
const js = gulp.series(scripts);
const build = gulp.series(clean, gulp.parallel(css, images, jekyll, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
