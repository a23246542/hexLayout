const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');

const {options} = require('./options');
const {bowerTask,vendorJs} = require('./vendor');
console.log(bowerTask,vendorJs);
console.log(option);
//production || development
// # gulp --env production

gulp.task('clean', () => {
    return gulp
      .src(['./.tmp', './public/**/*'], { read: false, allowEmpty: true }) // 選項讀取：false 阻止 gulp 讀取文件的內容，使此任務更快。
      .pipe($.clean());
  });
  // 當從 ['./public/**/*', './.tmp']陣列 換成 ['./.tmp', './public/**/*']
  // 就可以重覆一直刷 gulp build 不跳錯誤
