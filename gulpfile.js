var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var concat = require("gulp-concat");
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('client', function() {
  browserify('src/public/scripts/main.js')
    .transform(babelify.configure({
      optional: ['es7.decorators', 'es7.classProperties']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('server', function() {
  gulp.src("src/server/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('server.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/public/scripts/**/*.*', ['client']);
  gulp.watch('src/server/**/*.*', ['server']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('sync', function() {
  browserSync({
    server: '.',
    port: 8000
  });
});

gulp.task('build', ['sass', 'client', 'server']);
gulp.task('default', ['watch', 'build', 'sync']);

