/* gulp */
const gulp = require('gulp');
/* plugins */
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
/* const cleanCSS = require('gulp-clean-css'); */
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const order = require('gulp-order');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
/* Paths */
const paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts/'
  },
  html:{
    src:"index.html",
    dest:"dist"
  },
  img:{
    src:"src/img/**/*.*",
    dest: "dist/img/"
  }
};

/* Tasks */

/* css */
function styles() {
     return gulp.src(paths.styles.src)
    .pipe(order([
      'normalize.scss',
      'style.scss',
      'variables.mixins.scss',
      '_header.scss',
      '_editor.scss',
      '_testimonials.scss',
      '_pricing.scss',
      'media.scss' 
      ])) 
      .pipe(concat('main.min.css'))
      .pipe(sass().on('error', sass.logError))
      .pipe(cssnano())
     /*  .pipe(cleanCSS({ restructuring: false })) */
      .pipe(autoprefixer())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream());
      
  }
 /* js */
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

/*html */ 
function html() {
  return gulp.src(paths.html.src)
  .pipe(gulp.dest(paths.html.dest))
  .pipe(browserSync.stream());
}
/* image optimization */
function img() {
  return gulp.src(paths.img.src)
  .pipe(newer(paths.img.dest))
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
      plugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    })
  ]))
  .pipe(gulp.dest(paths.img.dest));
}

 /* watch */
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.img.src, img)
}
/* browsersync */
const server = () => {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	});
};
/* clean dist */
function clearDist() {
  return gulp.src(['dist'], {read: false, allowEmpty: true})
    .pipe(clean());
}

exports.build = gulp.series(clearDist, html, styles, scripts,  img );
exports.dev = gulp.series(html, styles, scripts, img, gulp.parallel(server, watch)); 
exports.clearDist =clearDist;


