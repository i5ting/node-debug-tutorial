// npm install --save gulp
// npm install --save gulp-gh-pages
// npm install --save gulp-open
// npm install --save gulp-rename
// npm install --save gulp-i5ting-toc
// npm install --save shelljs
var gulp = require('gulp');
var gp_deploy = require('gulp-gh-pages');
var open = require("gulp-open");
var rename = require("gulp-rename");
var i5ting_toc = require('gulp-i5ting-toc');
require('shelljs/global');

var options = {}
gulp.task('deploy', function () {
    return gulp.src('./preview/**/*')
        .pipe(gp_deploy(options));
});

gulp.task('rename',function () {
	if (exec('cp ./preview/README.html ./preview/index.html').code !== 0) {
	  echo('Error: rename exec failed');
	  exit(1);
	}	
});

gulp.task('generate', function() {
	var opt = {
    source_file: 'README.md',
    is_open: true,
    markd_config: {
        debug: false
    }
	}
	
	gulp.src('README.md')
		.pipe(i5ting_toc(opt));
});

gulp.task('default',['generate', 'rename', 'deploy'] ,function () {
  console.log('default');
});
