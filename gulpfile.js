//gulp 3.9.1
// var gulp = require('gulp');
// gulp.task('hello',function(cb){
//     console.log("hello gulp 3.9.1");
//     cb();
// })
//終端機 gulp hello
// ================================================
// $ npm install --save-dev gulp-load-plugins
// npm i browser-sync --save
// npm install --save gulp-plumber
// npm i minimist gulp-if --save
// npm install --save-dev gulp-clean


// ---壓縮套件---
// $ npm install gulp-htmlmin
// $ npm install gulp-clean-css --save-dev
// $ npm install gulp-uglify
// $ npm install gulp-imagemin

// ---dd103套件---

// ======================================================
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
// const {series,parallel} = require('gulp');//需要多打這行嗎?
// const sass = require('gulp-sass');
// const cleanCss = require('gulp-clean-css');
// var plumber = require('gulp-plumber');
var strip = require('gulp-strip-comments');
const gulpCompass = require('gulp-compass');
// ---下面放非gulp套件-----
// const browserSync = require('browser-sync');
// const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數
// const gulpSequence = require('gulp-sequence').use(gulp);

// production || development
// # gulp --env production
const envOptions = {
  string: 'env',
  default: { env: 'development' }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);


// gulp.task('clean', () => {
//   return gulp.src(['./public', './.tmp'], { read: false }) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
//     .pipe($.clean());
// });

function copyHtml(){
    // return gulp.src('.week4/source/**/*')
    // return gulp.src('./**/*')
    return gulp
    .src('./week4/**/*')//搬不到東西
    // .pipe(plumber())
    .pipe(htmlmin({ 
        collapseWhitespace: true, //折疊空白字元 壓縮html
        removeComments: true //刪除 HTML 註釋
        // minifyJS: true,//压缩页面JS
        // minifyCSS: true//压缩页面CSS
    }))
    .pipe(gulp.dest('./public/glasses'))
    // .pipe(browserSync.reload({
    //     stream: true,
    //   }));
}

function sass(){
     // PostCSS AutoPrefixer
    // var processors = [
    //     autoprefixer({
    //     browsers: ['last 5 version'],
    //     })
    // ];
    return gulp.src('./week4/source/sass/**/*.scss')
    .pipe($.plumber())
    // .pipe(sourcemaps.init())
    // .pipe($.sass({
    //     outputStyle: 'nested',
    //     includePaths:['./node_modules/bootstrap/scss'],//方便import
    // }).on('error',$.sass.logError))
    // .pipe($.postcss(processors))
    // .pipe($.stripCssComments({//沒用
    //     preserve:false,
    // }))
    .pipe($.stripJsonComments({
        // preserve:true,
        whitespace:false
    }))
    .pipe($.removeEmptyLines())
    // .pipe($.if(options.env === 'development',$.cleanCss({
    //     // format:'keep-break'
    //     // removeEmpty:true,
    //     format: 'nested'
    // })))
    .pipe($.if(options.env === 'production', $.cleanCss({
        compatibility: 'ie8', 
        level: 2, //感覺1就可以了
        // format: 'beautify'
    }))) // 假設開發環境則壓縮 CSS
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/glasses/scss'))
    // .pipe(browserSync.stream())
    // .pipe(browserSync.reload({
    //     stream: true
    //   }));
}

function compileScss(){
    return gulp
    .src("./public/glasses/scss/**/*.scss")
    // .pipe(gulp.src("./public/glasses/scss/**/*.scss"))//!!!粗心點
    .pipe($.sass({
        // outputStyle: 'nested',
        includePaths:['./node_modules/bootstrap/scss'],//方便import
    }).on('error',$.sass.logError))
    .pipe($.if(options.env === 'production', $.cleanCss({
        compatibility: 'ie8', 
        level: 2, //感覺1就可以了
        // format: 'beautify'
    }))) // 假設開發環境則壓縮 CSS
    .pipe(gulp.dest("./public/glasses/css"))
    // .dest("./public/glasses/css")
}



function VendorJs(){//還是babel??
    return gulp
    .src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',//不用額外載入jquery
        './week4/source/js/**/**.js'//是否有順序問題
    ])
    // .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    // .pipe($.concat('all.js'))
    // .pipe($.babel({ //要先babel再來
    //   presets: ['es2015']
    // }))
    //可改用gulp-uglify-es代替處理es6編譯問題
    // .pipe(
    //     $.if(options.env === 'production', $.uglify({//好像預設移除註解
    //       compress: {
    //         drop_console: true
    //       }
    //     })
    //   )
    // )
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/glasses/js'))
    // .pipe(browserSync.reload({
    //     stream: true
    //   }));

}



// gulp.task('imageMin', function () {
//     gulp.src('./source/images/*')
//       .pipe($.if(options.env === 'production', $.imagemin()))
//       .pipe(gulp.dest('./public/images'));
//   });

// const clean = () =>{
//     return gulp
//     .src(['./public','./.tmp'],{read: false,allowEmpty:true})//遇到空資料夾可以略過 不會爆錯找不到
//     .pipe($.clean());
// }

// function default(){//default不能拿來用
function defaultGulp(){
    // gulp.task('default',['jade','sass']);
}

// reloadDebounce:2000 讓不會一直整理過於頻繁

exports.copyHtml = copyHtml;
exports.sass = sass;//輸出才能用指令
exports.compileScss =compileScss;
// ---------------------------
/* --- 同步執行全部任務 --- */
// gulp.task('minify', gulp.parallel('minify-html', 'minify-css', 'minify-js'));
// 執行指定任務：
// $ gulp minify


// ------------下面這兩個任務可合併------------
// function browserSync(){
//     browserSync.init({
//         server:{
//             baseDir:'./public/glasses',
//             reloadDebounce: 2000
//         }
//     })
// }

// gulp.task('watch', function () {
//     gulp.watch(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'], ['sass']);
//     gulp.watch(['./source/**/*.jade'], ['jade']);
//     gulp.watch(['./source/javascripts/**/*.js'], ['babel']);
//   });

// --------------部屬到github------------------------
//   gulp.task('deploy', function () {
//     return gulp.src('./public/**/*')
//       .pipe($.ghPages());
//   });
  
//   ----------------------------------------------
//依序執行這些任務(先clean才執行jade.sass)
//   gulp.task('sequence', gulpSequence('clean', 'jade', 'sass', 'babel', 'vendorJs', 'imageMin'));
  
//   //沒有用sequence的話會同時執行這些任務
//   gulp.task('default', ['jade', 'sass', 'babel', 'vendorJs', 'browserSync', 'imageMin', 'watch']);
//   gulp.task('build', ['sequence'])

  //改成4.0 並輸出成public方法，可以兩種寫法
//   task一般用字串，函數則是直接把變數加進來

  //gulp 預設想開發時的指令
  exports.default = gulp.series(
    //   gulp.series(clean,bower,vendorJs),
    //   gulp.parallel(sass,copyHtml,babel,imageMin),
      clean,
      gulp.parallel(copyHtml,sass,compileScss)  
      function(done){//也可確保都做完再來browserSync跟watch
        //然後裡面的任務執行要改成series或parallel寫法
        browserSync.init({
            server:{
                baseDir:'./public/glasses',
                reloadDebounce: 2000
            }
        })
        
        gulp.watch(['./week4/source/sass/**/*.scss'],gulp.series(sass,compileScss));

        // gulp.watch(['./source/stylesheets/**/*.sass', './source/stylesheets/**/*.scss'],gulp.series('sass'));
        // gulp.watch(['./source/**/*.jade'], gulp.series('jade'));
        // gulp.watch(['./source/javascripts/**/*.js'], gulp.series('babel'));

        done();
      }
  )
// //gulp build  想壓縮成產品的指令
//   exports.build = gulp.series(
//       'clean',
//       'venderJs',
//       gulp.parallel('copyHtml','sass','bebel','imageMin')
//   )

// -----------------------------
