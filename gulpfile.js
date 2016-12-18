'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),//sass compiler
	autoprefixer = require('gulp-autoprefixer'),//https://www.npmjs.org/package/gulp-autoprefixer
	cleanCSS = require('gulp-clean-css'),//https://github.com/scniro/gulp-clean-css
	rename = require('gulp-rename'),//https://www.npmjs.org/package/gulp-rename
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglify'),//minify js
	jshint = require('gulp-jshint'),//js hint
	imagemin = require('gulp-imagemin'),//https://www.npmjs.com/package/gulp-imagemin
	pngquant = require('imagemin-pngquant'),//pngquant enabled saves extra bytes on PNG files
	cache = require('gulp-cache'),
	del = require('del'),
	//runSequence = require('run-sequence'),//this is a hack
	concat = require('gulp-concat'),//cocatenate files
	/* The gulp task system provides a gulp task 
	with a callback, which can signal successful
	task completion (being called with no arguments),
	or a task failure (being called with an Error 
	argument). Fortunately, this is the exact same format pump uses!*/
	pump = require('pump'),
	zip = require('gulp-zip'),
	notify = require('gulp-notify'),//gulp plugin to send messages based on Vinyl Files or Errors to Mac OS X, Linux or Windows using the node-notifier module. Fallbacks to Growl or simply logging
	spritesmith = require('gulp.spritesmith'),//sprite management - https://www.bignerdranch.com/blog/css-sprite-management-with-gulp/
	merge = require('merge-stream'),//Merge files
	inlinesource = require('gulp-inline-source'),//Inline Source for JS 
	replace = require('gulp-replace'),//replace string names

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
		dist: 'dist',
		main: './',
		folder: './dist'
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
		dist: 'dist/images',
		sprites: 'app/images/spriteSheet/*.png'
	}
};


//HTML COPY - used if compying to another directory
gulp.task('copy-html', function(){
	gulp.src(paths.html.src)
	.pipe(gulp.dest(paths.html.dist));
	console.log('Copy HTML');
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
	console.log('Watching Sass File');
});

gulp.task('sass-build', function() {  
    gulp.src(paths.styles.src)
        .pipe(sass({includePaths: ['scss'], style: 'expanded' }))
        .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
        .pipe(concat('style.css'))
		.pipe(cleanCSS()) //*minify
	console.log('Sass File Built');
});


//SPRITE SHEET
gulp.task('sprite-watch', function(){
	var spriteData = gulp.src(paths.images.sprites)
		.pipe(spritesmith({
			imgName: '../images/spriteSheet.png',
			cssName:  'spriteSheet.css'
		}))
	spriteData.img.pipe(gulp.dest(paths.images.main));
	spriteData.css.pipe(gulp.dest(paths.styles.main));
	console.log('Watching SpriteSheet and SpriteSheet CSS');
});

gulp.task('sprite-build', function(){
	var spriteData = gulp.src(paths.images.sprites)
		.pipe(spritesmith({
			// this whole image path is used
			//in css background declarations
			imgName: 'spriteSheet.png',
			cssName:  'spriteSheet.css'
		}));
	spriteData.img.pipe(gulp.dest(paths.base.dist));
	spriteData.css.pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(cleanCSS())
	console.log('Bulding SpriteSheet and SpriteSheet CSS');
});


//JAVASCRIPT WATCH {Compress}
gulp.task('JS-watch', function(){
	pump([
		gulp.src(paths.scripts.src),
		gulp.dest(paths.scripts.main),
		browserSync.stream()
	]);
	console.log('Watching JS Files');
});

gulp.task('JS-build', function(){
	pump([
		gulp.src(paths.scripts.src),
		//rename({suffix: '.min'}), //*rename
		concat('script.js'),//*concat
		uglify()//, //*minify
	]);
	console.log('Concating and moving all the JS files in /js folder');
});


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
  		.pipe(gulp.dest(paths.base.dist));
  	console.log('Minifying Image');
});


//CLEAN DIST FOLDER
gulp.task('clean:dist', function() {
  return del.sync([paths.base.dist + './*', paths.base.main + './*.zip']);
})


//INLINE CSS AND JAVASCRIPT
gulp.task('inlinesource', function () {
    return gulp.src(paths.html.src)
        .pipe(inlinesource())
        .pipe(gulp.dest(paths.base.dist));
    console.log('Adding Javscript and CSS to Hmtl Inline');
});


//REPLACE 
gulp.task( 'replace', [ 'inlinesource' ], function( done ) {
    gulp.src( paths.base.dist + '/index.html' )
        .pipe( replace( '../images/', 'images/') )
        .pipe( replace( 'images/', './') )
        .pipe( gulp.dest( paths.base.dist ) )
        .on('end', function () { done(); });
});


//ZIP FILES - FOLDER
gulp.task('zip-the-files', function() {
	console.log('Zipping Filename = ', zipName);
	gulp.src(paths.base.main + '*/')
		.pipe(zip(zipName + '.zip'))
		.pipe(gulp.dest('./'))
		.on('error', notify.onError({
		        title: 'Zip File Failed', 
		        message: 'One or more tests failed, see cli for details.'
		}));
});


//WATCH
gulp.task('watch', function() { 
	gulp.watch(paths.styles.src, ['sass']);// sass
	gulp.watch(paths.styles.src).on('change', browserSync.reload);//sass
	gulp.watch(paths.scripts.src).on('change', browserSync.reload);//.js
	gulp.watch(paths.base.html).on('change', browserSync.reload);//html
	gulp.watch(paths.images.sprites,['sprite-watch']);//sprite
	//gulp.watch(paths.images.src,['imageMin']);//imageMin
});


//DEFAULT TASKS
gulp.task('default',['sass', 'sprite-watch', 'JS-watch', 'browser-sync', 'watch']);


//BUILD TASK
gulp.task('build', ['clean:dist', 'sass-build', 'JS-build', 'copy-html', 'sprite-build', 'imageMin', 'replace'/*,'zip-the-files'*/], function(){
	gulp.src(  paths.base.dist + '/*' )
        .pipe(zip(zipName + '.zip'))
		.pipe(gulp.dest('./'))
		.on('error', notify.onError({
	        title: 'Zip File Failed', 
	        message: 'One or more tests failed, see cli for details.'
	}));
	console.log('Zipping Filename = ', zipName);
});