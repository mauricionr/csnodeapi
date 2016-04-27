'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('default', ['browser-sync'], function () { });

gulp.task('lint', function () {
  gulp.src('./resource/**/*.js')
    .pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["gulpfile.js", "resource/**/*.js"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'server.js',
		tasks: ['lint']
	})
		.on('start', function () {
			// to avoid nodemon being started multiple times
			// thanks @matthisk
			if (!started) {
				cb();
				started = true;
			}
		})
		.on('restart', function () {
			gutil.log('Restarted!')
		});
});