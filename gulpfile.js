'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),//sass compiler
	autoprefixer = require('gulp-autoprefixer'),//https://www.npmjs.org/package/gulp-autoprefixer
	minifycss = require('gulp-minify-css'),//https://www.npmjs.org/package/gulp-minify-css
	rename = require('gulp-rename'),//https://www.npmjs.org/package/gulp-rename
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),//minify js
	jshint = require('gulp-jshint'),//js hint
	imagemin = require('gulp-imagemin'),//https://www.npmjs.com/package/gulp-imagemin
	pngquant = require('imagemin-pngquant'),//pngquant enabled saves extra bytes on PNG files
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence'),
	concat = require('gulp-concat'),//cocatenate files
	/* The gulp task system provides a gulp task 
	with a callback, which can signal successful
	task completion (being called with no arguments),
	or a task failure (being called with an Error 
	argument). Fortunately, this is the exact same format pump uses!*/
	pump = require('pump'),
	zip = require('gulp-zip'),

	//NAME ZIP FILE AFTER MAIN DIRECTORY
	dirParts = __dirname.split('/'),
	zipName = dirParts[dirParts.length - 1];//Then within the "zip-the-files" task definition, replace the hardcoded zip name with: zipName + '.zip'



//PATHS
var paths = {
	base: {
		src: './app',
		html: 'app/*.html',
		css: 'app/css/*.css',
		js: 'js/*.js',
		dist: 'dist'
	}, 
	html: {
		src: 'app/index.html',
		main: './',
		dist: 'dist'
	},
	styles: {
		src: 'app/scss/**/*.scss',
		main: 'app/css',
		dist: 'dist/css'
	},
	scripts: {
		src: 'app/js/**/*.js',
		main: 'app/js',
		dist: 'dist/js',
		compress: 'dist/js/*.js'
	},
	images: {
		src: 'app/images/*.{jpg,png,gif,jpeg}',
		main: 'app/images',
		dist: 'dist/images'
	}
};


//HTML COPY - used if compying to another directory
gulp.task('copy-html', function(){
	gulp.src(paths.html.src)
	.pipe(gulp.dest(paths.html.dist))
});

//SASS
// Because Browsersync only cares 
// about your CSS when it's finished compiling
// - make sure you call .stream() after gulp.dest
gulp.task('sass', function() {  
    gulp.src(paths.styles.src)
        .pipe(sass({includePaths: ['scss'], style: 'expanded' }))
        .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest(paths.styles.main))//app folder
		.pipe(browserSync.stream());
});

gulp.task('sass-build', function() {  
    gulp.src(paths.styles.src)
        .pipe(sass({includePaths: ['scss'], style: 'expanded' }))
        .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
        .pipe(concat('style.css'))
		.pipe(minifycss()) //*minify
		.pipe(gulp.dest(paths.styles.dist));//dist folder
});


//JAVASCRIPT WATCH {Compress}
gulp.task('JS', function(){
	pump([
		gulp.src(paths.scripts.src),
		gulp.dest(paths.scripts.main),
		browserSync.stream()
	]);
});


gulp.task('JS-build', function(){
	console.log("Concating and moving all the JS files in styles folder");
	pump([
		gulp.src(paths.scripts.src),
		//rename({suffix: '.min'}), //*rename
		//concat('main.js'),//*concat
		uglify(), //*minify
		gulp.dest(paths.scripts.dist)
	]);
})


//BROWSER SYNC - LIVE RE-LOAD
// ***can use 'serve' where 'browser-sync' is used***
gulp.task('browser-sync', function() {  
    browserSync.init([paths.base.css, paths.base.js], {
        server: {
            baseDir: paths.base.src
        }
    });
});


//JS LINT {UNUSED}
gulp.task('jshint', function(){
	gulp.src(paths.scripts.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
	gulp.watch(paths.scripts.src).on('change', browserSync.reload);
});


//IMAGE-MINIFY
gulp.task('imageMin', function () {
    gulp.src(paths.images.src)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 6,
            use: [pngquant()], 
        	interlaced: true
        }))
  		.pipe(gulp.dest(paths.images.dist));
});


//CLEAN DIST FOLDER
gulp.task('clean:dist', function() {
  return del.sync(paths.base.dist);
})


//ZIP FILES - FOLDER
gulp.task('zip-the-files', function() {
  return gulp.src(paths.base.dist  + '/*')
  .pipe(zip(zipName + '.zip'))
  .pipe(gulp.dest('./'));
  //console.log('zip file ',zipName);
});


//WATCH
gulp.task('watch', function() { 
	gulp.watch(paths.styles.src, ['sass']);// sass
	gulp.watch(paths.styles.src).on('change', browserSync.reload);//sass
	gulp.watch(paths.scripts.src).on('change', browserSync.reload);//.js
	gulp.watch(paths.base.html).on('change', browserSync.reload);//html
	//gulp.watch(paths.images.src,['imageMin']);//imageMin
});


//DEFAULT TASKS
gulp.task('default', function() { 
	runSequence('watch',['sass', 'browser-sync', 'JS']) 
});


//BUILD TASK
gulp.task('build', function(){
	runSequence('clean:dist',['sass-build','JS-build', 'copy-html','imageMin', 'zip-the-files'])
});
