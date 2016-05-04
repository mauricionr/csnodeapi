'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var react = require('gulp-react');
var concat = require('gulp-concat');
var cache = require('gulp-cached');

var apiDir = './resource/**/*.*';
var componentsDir = './components/*.*';
var compiledComponentsDir = './public/components/';
var compiledComponentsJsDir = './public/components/*.*';
var publicCompiledComponentsJsDir = './public/';
var publicFiles = './public/*.*/*.*';
var componentsFiles = './components/*.*';

gulp.task('default', ['lint', 'jsx'], function () {
	return gulp.start('browser-sync');
});

gulp.task('lint', ['lint:api', 'lint:front-end', 'jsx'], function () {
	return gulp.start('concat:js');
})

gulp.task('lint:api', function () {
	return gulp.src(apiDir)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('lint:front-end', function () {
	return gulp.src(componentsDir)
		.pipe(react({ harmony: true }))
		.pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('react', function () {
	return gulp.src('./node_modules/react/dist/*.min.js')
		.pipe(gulp.dest('./public/libs/'))
})

gulp.task('react-dom', function () {
	return gulp.src('./node_modules/react-dom/dist/*.min.js')
		.pipe(gulp.dest('./public/libs/'))
})

gulp.task('jsx', function () {
	return gulp.src(componentsDir)
		.pipe(react({ harmony: true }))
		.pipe(gulp.dest(compiledComponentsDir));
});

gulp.task('concat:js', function () {
	return gulp.src(compiledComponentsJsDir)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(publicCompiledComponentsJsDir));
})

gulp.task('browser-sync', ['nodemon'], function () {
	return browserSync.init(null, {
		proxy: "http://localhost:3000",
		files: [componentsFiles, publicFiles],
		browser: "google chrome",
		port: 7000,
	});
});

gulp.task('clean:api', function () {
	return gulp
		.src('build', { read: false })
		.pipe(clean());
})

gulp.task('build:api', ['clean', 'lint', 'uglify:api'], function () {
    gutil.log('Fim build:api!')
});

gulp.task('uglify:api', function (params) {
	return gulp.src(apiDir)
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build'));
})

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({ script: 'server.js', tasks: ['lint'] })
		.on('start', function () {
			if (!started) {
				cb();
				started = true;
			}
		})
		.on('restart', function () {
			gutil.log('Restarted!');
		});
});