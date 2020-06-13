const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist'); // 用來讀取指令轉成變數

const { envOptions } = require('./envOptions');
const { mkRevice,revice,reviceSass} = require('./revice');



let options = minimist(process.argv.slice(2), envOptions);
//現在開發狀態
console.log(`Current mode：${options.env}`);




function html() {
    return gulp.src(envOptions.html.src)
        .pipe($.plumber())
        // .pipe($.if(options.env === 'prod', $.htmlmin({
        //     // collapseWhitespace: true, //折疊空白字元 壓縮html
        //     removeComments: true //刪除 HTML 註釋
        //     // minifyJS: true,//压缩页面JS
        //     // minifyCSS: true//压缩页面CSS
        // })))
        // .pipe($.ejs({
        //     // msg:"hello gulp!"
        // }))
        .pipe($.frontMatter())
        .pipe(
            $.layout((file) => {
                return file.frontMatter;
            })
        )
        .pipe(gulp.dest(envOptions.html.path))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function sass() {
    const plugins = [//好像改方法了六角
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
    .pipe($.postcss(plugins))//做強化
    // .pipe($.postcss([autoprefixer()]))//新版??
    .pipe($.concat("all.css"))
    .pipe($.if(options.env === 'prod', $.cleanCss({// 假設開發環境則壓縮 CSS
        compatibility: 'ie8', 
        level: 1,
        // format: 'beautify'
    }))) 
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
    //   presets: ['@babel/env'],//呼叫不到
    // .pipe($.babel({
    //     presets:['es2015']
    // }))
    .pipe($.concat(envOptions.js.concat))
    .pipe($.if(options.env === 'prod', $.uglify({
        compress: {
            drop_console: true
          }
    })))
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
    .pipe($.sourcemaps.init()) // 初始化 sourcemaps
    .pipe($.concat(envOptions.vendors.concat))
    // .pipe($.if(options.env === 'prod', $.uglify()))
    .pipe($.sourcemaps.write('./')) // 寫入 sourcemaps
    .pipe(gulp.dest(envOptions.vendors.path));
}

function copyFiles() {
    // return gulp.src(envOptions.)
}
function images(){
    return gulp.src(envOptions.img.src)
        // .pipe($.if(envIsPro=== 'prod', $.imagemin()))  // 如果在生產環境，就壓縮圖片
        .pipe($.if(options.env === 'prod', $.imagemin()))  // 如果在生產環境，就壓縮圖片
        .pipe(gulp.dest(envOptions.img.path))
}

function clean() {
    return gulp.src(envOptions.clean.src, {
        read: false,//If you need the file and its contents after cleaning in the same stream, do not set the read option to false.
        allowEmpty: true,
    })
    .pipe($.clean());
}

function browser() {
    browserSync.init({
        server: {
          baseDir: envOptions.browserSetting.dir,
        //   baseDir:"./dist/",
          index: "dashboard.html",//試了兩次沒加都失敗??
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
}

//   function deploy() {
//     return gulp.src(envOptions.deploySrc)
//       .pipe($.ghPages());
//   }

exports.default = gulp.series(clean,html,sass,babel,vendorJs,images,gulp.parallel(browser,watch))
exports.images = images;

exports.mkRevice = mkRevice;
exports.revice = revice;
exports.reviceSass = reviceSass;

// =========安裝================
// npm install ejs --save-dev # 因為該專案用 EJS 樣板語言來寫 HTML，所以裝它
// npm install gulp-front-matter --save-dev # 可以幫每頁 HTML 個別設定變數，好用
// npm install gulp-layout --save-dev # 可以先接收 front-matter 傳來的值，然後傳到 EJS 模板接收變數，再轉成 HTML