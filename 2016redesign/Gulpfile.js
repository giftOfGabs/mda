var gulp = require('gulp');
sass = require('gulp-ruby-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename');
imagemin = require('gulp-imagemin');
cache = require('gulp-cache'),
scsslint = require('gulp-scss-lint');
del = require('del');

gulp.task('styles', function() {
  return sass('sass', { style: 'expanded' })
  .pipe(gulp.dest('stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('stylesheets'));
});

gulp.task('images', function(){
  return gulp.src('images/*')
  .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
  .pipe(gulp.dest('dist/images'));
});
gulp.task('watch', function() {
  gulp.task('scss-lint', function() {
    return gulp.src('/scss/*.scss')
    .pipe(scsslint());
  });
  gulp.watch('sass/*.scss', ['styles']);
});
gulp.task('default',['watch'], function(){
  gulp.start('images');
});