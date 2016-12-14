# GULP-TASK-CONTROL-V2
<br>https://css-tricks.com/gulp-for-beginners/
<br>//Browsersych -https://www.browsersync.io/docs/gulp/
<br><br>//How to use Gulp to generate CSS from Sass/scss -- http://www.codingpedia.org/ama/how-to-use-gulp-to-generate-css-from-sass-scss/
<br>https://www.snip2code.com/Snippet/42148/GulpJS---SASS---BrowserSync-ftw
<br>
<br> YOU may want to upgrade node verison before installing gulp: https://davidwalsh.name/upgrade-nodejs
<br>sudo npm cache clean -f
<br>sudo npm install -g n
<br>sudo n stable
<br>
<br>Installing Gulp:
https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
<br>npm install --global gulp-cli
<br>npm init
<br>



<br>Main Modules Used. You can install all with the folowing line: npm install --save-dev gulp-util  gulp-sass  gulp-minify-css gulp-rename  gulp-autoprefixer gulp-util gulp-minify-css gulp-rename del gulp-uglify gulp-concat jshint gulp-jshint gulp-wrapper gulp-sourcemaps jshint-stylish gulp-plumber gulp-cache gulp-imagemin imagemin-pngquant run-sequence browser-sync pump gulp-zip gulp-notify gulp.spritesmith
<br> 
<br>Uglify: - npm install --save-dev gulp-uglify
<br>PUMP: - npm install pump
<br>JShint: npm install jshint gulp-jshint --save-dev
<br>Jshint - Stylish: npm install jshint-stylish --save-dev
<br>Plumber - Prevent pipe breaking caused by errors from gulp plugins:  npm install --save-dev gulp-plumber
<br>Cache: npm install gulp-cache --save-dev
<br>Imagemin: npm install --save-dev gulp-imagemin
<br>pngquant imagemin - Returns a promise for a buffer: npm install --save imagemin-pngquant
<br>Clean Task: npm install del --save-dev
<br>***Optional This is a Hack*** Run Sequence: npm install run-sequence --save-dev
<br>Gulp Zip: npm install --save-dev gulp-zip
<br>Browser Synch:  npm install -g browser-sync
<br>Gulp Notify: npm install --save-dev gulp-notify
<br>Sprite Management: npm install --save-dev gulp.spritesmith
<br>
<br>****Note: In the gulfile.js gulp tasks in the "[]"" run first!!!! However they all run simultaneously!!!!****
<br> 'gulp' to run server and watch
<br> 'gulp build' to build files in 'dist' folder

