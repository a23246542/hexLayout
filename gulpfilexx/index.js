const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數

const {envOptions} = require('./envOption');
// const {bowerTask,vendorJs} = require('./vendor');
// console.log(bowerTask,vendorJs);
// console.log(option);
//production || development
// # gulp --env production

gulp.task('clean', () => {
    return gulp
      .src(['./.tmp', './public/**/*'], { read: false, allowEmpty: true }) // 選項讀取：false 阻止 gulp 讀取文件的內容，使此任務更快。
      .pipe($.clean());
});
  // 當從 ['./public/**/*', './.tmp']陣列 換成 ['./.tmp', './public/**/*']
  // 就可以重覆一直刷 gulp build 不跳錯誤

  function copyFile(){
    return gulp.src(`從mydev搬`)
    // .pipe($.htmlmin({ 
    //   collapseWhitespace: true, //折疊空白字元 壓縮html
    //   removeComments: true //刪除 HTML 註釋
    //   // minifyJS: true,//压缩页面JS
    //   // minifyCSS: true//压缩页面CSS
    // }))
    .pipe(gulp.dest(`搬到rivice.public建立資料夾`))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
  }
  function reviceAsset(){
    return gulp.src('./src/mydev/assets/**/*')
    .pipe(gulp.dest('./src/revice/assets'))
  }
  function reviceHtml(){
    return gulp.src(envOption.reviceFile.html.src)
    .pipe(gulp.dest(envOptions.reviceFile.html.path))
  }

  function reviceSass(){
    // return gulp.src(`mydev下resume.glass的sass資料夾`)
    return gulp.src(envOption.reviceFile.style.src)
    .pipe($.plumber())
    .pipe($.stripJsonComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    // .pipe(gulp.dest(`revise下的resume.glass的sass資料夾`))
    .pipe(gulp.dest(envOption.reviceFile.style.path))
  }

  function reviceJs(){
    return gulp.src(envOption.reviceFile.js.src)
    .pipe($.plumber())
    .pipe($.stripComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest(envOption.reviceFile.js.path))
  }
  // function copy(){
  //   return gulp.src(envOption.)
  // }

  async function revice(){
    return gulp.parallel(reviceHtml,reviceSass,reviceJs,reviceAsset)
    done()
  }

  function sass() {
    const plugins = [
      autoprefixer(),
    ];
    return gulp.src(envOptions.style.src) 
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: envOptions.style.outputStyle,
        includePaths: envOptions.style.includePaths,
      }).on('error', $.sass.logError))
      .pipe($.postcss(plugins))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(envOptions.style.path))
      .pipe(
        browserSync.reload({
          stream: true,
        }),
      );
  }


  function watch() {
    gulp.watch(envOptions.html.src, gulp.series(layoutHTML));
    gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    gulp.watch(envOptions.javascript.src, gulp.series(babel));
    gulp.watch(envOptions.img.src, gulp.series(copyFile));
    gulp.watch(envOptions.style.src, gulp.series(sass));
  }
  

// 1.清除pub 2.搬去revie.pub 3.
  // exports.default = gulp.series(clean,copyFile);

  exports.revice = revice;