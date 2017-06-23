var gulp = require('gulp');
var browserify = require('browserify');
var glob = require("glob");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var browserSync = require('browser-sync').create();
var htmlmin = require('gulp-htmlmin');


var paths = {
  scripts: './source/assets/js/**/*.js',
  images: './source/assets/img/**/*',
  sass: './source/assets/sass/**/*.scss',
  pages: [
    './source/**/*.html',
    './source/**/*.php'
  ]
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['./build']);
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    // .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./build/assets/img'));
});

// Copy all html pages
gulp.task('pages', function() {
  return gulp.src(paths.pages)
    // Pass in options to the task
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true})) //himl minify
    .pipe(gulp.dest('./build'));
});

// sass
gulp.task('sass', function () {
 return gulp.src(paths.sass)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('./build/assets/css'))
  .pipe(browserSync.stream());
});

// browserify
gulp.task('browserify', function() {
  var scriptFiles = glob.sync(paths.scripts);
    return browserify({
      entries: scriptFiles,
      debug:true
    })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    // .pipe(sourcemaps.init())
    .pipe(source('bundle.js'))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    // .pipe(uglify())
    // .pipe(sourcemaps.write('/'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/assets/js'));
});

// browser sync
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./build"
    });
});



// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./source/assets/js/app.js', ['browserify']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.pages, ['pages']);
  gulp.watch(paths.sass, ['sass']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'images', 'pages', 'sass', 'browserify']);
