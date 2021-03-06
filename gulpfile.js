"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // dev server
var open = require('gulp-open'); // open url in server
var browserify = require('browserify'); // bundle JS
var reactify = require('reactify'); // JSX rendering
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // concatenate files
var sass = require('gulp-sass'); // concatenate files

var config = {
	port: 9005,
	devBaseUrl: 'http:localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		sass: './src/sass/**/*.scss',
		images: './src/images/*',
		mainJs: './src/main.js',
		dist: './dist/'
	}
};

gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.sass, ['sass']);
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass', function(){
	gulp.src(config.paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});


gulp.task('default', ['html', 'js', 'css', 'sass', 'images', 'open', 'watch']);










