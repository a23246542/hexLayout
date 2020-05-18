const gulp = require('gulp');//!!!要重新匯入
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數

const { envOptions } = require('./envOptions');

let options = minimist(process.argv.slice(2), envOptions);
//現在開發狀態
console.log(`Current mode：${options.env}`);



function reviceHtml() {
    return gulp.src(envOptions.revice.html.src)
        .pipe(gulp.dest(envOptions.revice.html.revice))
}

function reviceSass() {
    // return gulp.src(`mydev下resume.glass的sass資料夾`)
    return gulp.src(envOptions.revice.style.src)
        .pipe($.plumber())
        .pipe($.stripJsonComments({
            whitespace: false
        }))
        .pipe($.removeEmptyLines())
        // .pipe(gulp.dest(`revise下的resume.glass的sass資料夾`))
        .pipe(gulp.dest(envOptions.revice.style.revice))
}

function reviceJs() {
    return gulp.src(envOptions.revice.js.src)
        .pipe($.plumber())
        .pipe($.stripComments({
            whitespace: false
        }))
        .pipe($.removeEmptyLines())
        .pipe(gulp.dest(envOptions.revice.js.revice))
}

function reviceImg() {
    return gulp.src(envOptions.revice.otherFiles.src)
        .pipe($.imagemin())
        .pipe(gulp.dest(envOptions.revice.otherFiles.path))
}

// function reviceAsset(){
//     return gulp.src('./src/mydev/assets/**/*')
//     .pipe(gulp.dest('./src/revice/assets'))

// }

function html() {
    return gulp.src(`${envOptions.revice.html.revice}/*.html`)
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
    return gulp.src(envOptions.revice.style.revice)
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


function reviceBrowser() {
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
function reviceWatch(){
    gulp.watch(envOptions.revice.html.revice, gulp.series(reviceHtml));
    // gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    gulp.watch(envOptions.revice.style.revice, gulp.series(reviceSass));
    gulp.watch(envOptions.revice.js.revice, gulp.series(reviceJs));
    // gulp.watch(envOptions.revice.img.revice, gulp.series(reviceImg));
}

async function revice() { //不知道為什麼無效
    return gulp.parallel(reviceHtml, reviceSass, reviceJs)
    // done()
}

//   exports.revice = revice;
exports.mkRevice = gulp.series(reviceHtml, reviceSass, reviceJs,);
exports.revice = gulp.series(html,sass,babel,gulp.parallel(reviceBrowser,reviceWatch));