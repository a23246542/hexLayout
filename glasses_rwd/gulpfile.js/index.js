const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數

const { envOptions } = require('./envOptions');
const { mkRevice,revice } = require('./revice');



let options = minimist(process.argv.slice(2), envOptions);
//現在開發狀態
console.log(`Current mode：${options.env}`);




function html() {
    return gulp.src(envOptions.html.src)
        .pipe($.plumber())
        .pipe($.if(options.env === 'prod', $.htmlmin({
            // collapseWhitespace: true, //折疊空白字元 壓縮html
            removeComments: true //刪除 HTML 註釋
            // minifyJS: true,//压缩页面JS
            // minifyCSS: true//压缩页面CSS
        })))
        .pipe(gulp.dest(envOptions.html.path))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function sass() {
    const plugins = [
        autoprefixer(),
    ];
    return gulp.src(envOptions.style.src)
    // return gulp.src("./src/sass/all.scss")
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        outputStyle: envOptions.style.outputStyle,
        includePaths: envOptions.style.includePaths,
    }).on('error', $.sass.logError))
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'prod', $.cleanCss({
        compatibility: 'ie8', 
        level: 1, //感覺1就可以了
        // format: 'beautify'
    }))) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    // .pipe($.if(options.env === 'prod',$.rename({//針對生產環境與開發環境所釋出的檔案個別命名以方便辨認
    //     // dirname: './component',
    //     // basename: 'stylesheet',
    //     // prefix: 'master-',
    //     suffix: '.min',
    //     // ./public/component/master-stylesheet.min.css
    // }))
    .pipe(gulp.dest(envOptions.style.path))
    .pipe(
        browserSync.reload({
            stream: true,
        }),
    );
    
}

function babel(){
    return gulp.src(envOptions.js.src)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    // .pipe($.babel({
    //   presets: ['@babel/env'],
    // }))
    .pipe($.concat(envOptions.js.concat))
    .pipe($.if(options.env === 'prod', $.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(envOptions.js.path))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
}

function vendorJs() {
    return gulp.src(envOptions.vendors.src)
    .pipe($.plumber())
    .pipe(sourcemaps.init()) // 初始化 sourcemaps
    .pipe($.concat(envOptions.vendors.concat))
    // .pipe($.if(options.env === 'prod', $.uglify()))
    .pipe(sourcemaps.write('./')) // 寫入 sourcemaps
    .pipe(gulp.dest(envOptions.vendors.path));
}

function copyFiles() {
    // return gulp.src(envOptions.)
}
function images(){
    return gulp.src(envOptions.img.src)
        .pipe($.imagemin())
        .pipe(gulp.dest(envOptions.img.path))
}

function clean() {
    return gulp.src(envOptions.clean.src, {
        // read: false,//If you need the file and its contents after cleaning in the same stream, do not set the read option to false.
        // allowEmpty: true,
      })
      .pipe($.clean());
}

function browser() {
    browserSync.init({
        server: {
          baseDir: envOptions.browserSetting.dir,
        //   baseDir:"./dist/",
          index: "glasses.html",//試了兩次沒加都失敗??
          reloadDebounce: 2000
        },      
        // port: envOptions.browserSetting.port,
    });
}


function watch() {
    gulp.watch(envOptions.html.src, gulp.series(html));
    // gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    gulp.watch(envOptions.style.src, gulp.series(sass));
    gulp.watch(envOptions.js.src, gulp.series(babel));
    gulp.watch(envOptions.img.src, gulp.series(images));
    // ----------------------------------------------------
    // gulp.watch(envOptions.revice.html.src, gulp.series(reviceHtml));
    // gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    // gulp.watch(envOptions.revice.style.src, gulp.series(reviceSass));
    // gulp.watch(envOptions.revice.js.src, gulp.series(reviceJs));
    // gulp.watch(envOptions.revice.img.src, gulp.series(reviceImg));
}

// function clean() {
//     return gulp.src(envOptions.clean.src, {
//         read: false,
//         allowEmpty: true,
//       })
//       .pipe($.clean());
//   }
  
//   function deploy() {
//     return gulp.src(envOptions.deploySrc)
//       .pipe($.ghPages());
//   }

exports.default = gulp.series(clean,html,sass,babel,vendorJs,gulp.parallel(browser,watch))
exports.images = images;

exports.mkRevice = mkRevice;
exports.revice = revice;