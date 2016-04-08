var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;

//основная цепочка
gulp.task('scss', function(){
	gulp.src('result/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifycss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('result/css'))
		.pipe(browserSync.reload({stream: true}));
});

//bower + wiredep, который добавляет нужные скрипты и стили из папки bower в указанное место в <head> index.html
gulp.task('bower', function () {
  gulp.src('./result/index.html')
    .pipe(wiredep({
      directory : "result/vendor"
    }))
    .pipe(gulp.dest('./result'));
});

//вызов browser-sync для онлайн-слежения за изменениями в браузерах
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'result'
		},
		notify: false
	});
});

//слежка изменений
gulp.task('watch', ['browser-sync', 'scss'], function (){
	gulp.watch('result/scss/*.scss', ['scss']);
	gulp.watch('result/*.html', browserSync.reload);
	gulp.watch('result/js/**/*.js', browserSync.reload);
});

//определяем какие задачи будут исполнятся по-умолчанию(вызов gulp)
gulp.task('default', ['watch']);
