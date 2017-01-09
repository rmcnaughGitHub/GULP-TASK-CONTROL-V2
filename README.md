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



<br>Main Modules Used. You can install all with the following line: npm install --save-dev gulp-util  gulp-sass gulp-rename  gulp-autoprefixer gulp-util gulp-clean-css gulp-rename del gulp-uglify gulp-concat jshint gulp-jshint gulp-wrapper gulp-sourcemaps jshint-stylish gulp-plumber gulp-cache gulp-imagemin imagemin-pngquant run-sequence browser-sync pump gulp-zip gulp-notify gulp.spritesmith gulp-inline-source gulp-replace
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
<br>
<br>Sprite Management: npm install --save-dev gulp.spritesmith
<br>**NOTE** adding jpgs to the spritesheet may increase the out-put size (when building) by 200% or more. It seem to be an error in the spritesheet build process.
<br>
<br>Merge File: npm install --save-dev merge-stream
<br>Minify Css: npm install gulp-clean-css --save-dev
<br>
<br>Inline Source for JS: npm install gulp-inline-source --save-dev 
<br>****Note html file must have "inline" tag****: Example "< script src="../js/inlineScript.js" ****inline****>< /script >"
<br>
<br>Replace String Names: npm install --save-dev gulp-replace
<br>
<br><u>GLOBBING</u>:
<br>
*.scss: The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project).
<br>
**/*.scss: This is a more extreme version of the * pattern that matches any file ending with .scss in the root folder and any child directories.
<br>
!not-me.scss: The ! indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.
<br>
*.+(scss|sass): The plus + and parentheses () allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder.
<br>
<br>
<br>****Note: In the gulfile.js gulp tasks in the the "Array" run first!!!! However they all run simultaneously!!!!****
<br> 'gulp' to run server and watch
<br> 'gulp build' to build files in 'dist' folder

