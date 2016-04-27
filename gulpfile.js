'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

var apiDir = './resource/**/*.js'

gulp.task('default', ['lint', 'browser-sync'], function () { });

gulp.task('lint', function () {
	gulp.src(apiDir)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["gulpfile.js", apiDir],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('clean', function () {
	return gulp.src('build', { read: false })
		.pipe(clean());
})

gulp.task('build:api', ['clean', 'lint', 'uglify'], function () {
    gutil.log('Fim build:api!')
});

gulp.task('uglify', function (params) {
	return gulp.src(apiDir)
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build'));
})

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