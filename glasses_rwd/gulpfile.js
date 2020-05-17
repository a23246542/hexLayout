const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');

const srcPath = './src';
const revicePath = "./revice"
const distPath = './dist';
const nodePath = '../node_modules';//如何從根目錄

let envOptions = {
    string: 'env',
    default: {
      env: 'dev',
    },
    html: {
        src: [
            `${srcPath}/**/*.html`,
        ],
        // ejsSrc: [
        //   `${srcPath}/**/*.ejs`,
        // ],
        path: distPath,
    },
    style: {
        src: [
            `${srcPath}/sass/**/*.scss`,
        ],
        outputStyle: 'expanded',
        includePaths: [
            `${nodePath}/bootstrap/scss`,
        ],
        path: `${distPath}/sass`,
    },
    js: {
        src: [
            `${srcPath}/js/**/*.js`
        ],
        concat: 'all.js',
        path: `${distPath}/js/`,
    },
    vendors: {
        src: [
          `${nodePath}/jquery/dist/**/jquery.slim.min.js`,
          `${nodePath}/bootstrap/dist/js/**/bootstrap.bundle.min.js`, // 已包含 popper.js
        ],
        concat: 'vendors.js',
        path: `${distPath}/js`,
    },
    img:{
        src:`${srcPath}/images/**/*`,
        path: `${distPath}/images`
    },
    otherFiles: {
        src: [
            `${srcPath}/**/*`,
            `!${srcPath}/**/*.html`,
            // `!${srcPath}/**/*.ejs`,
            `!${srcPath}/js/**/*.js`,
            `!${srcPath}/style/*`,
            `!${srcPath}/style/**/*.scss`,
            `!${srcPath}/style/**/*.sass`,
        ],
        path: distPath,
    },
    clean: {
        src: distPath,
    },
      browserSetting: {
        dir: distPath,
        port: 8080,
    },
    deploySrc: `${distPath}/**/*`,
    revice: {
        html: {
            src: [
                `${srcPath}/**/*.html`,
            ],
            // ejsSrc: [
            //   `${srcPath}/**/*.ejs`,
            // ],
            revice: revicePath,
        },
        style: {
            src: [
                `${srcPath}/sass/**/*.scss`,
            ],
            outputStyle: 'expanded',
            includePaths: [
                `${nodePath}/bootstrap/scss`,
            ],
            path: `${distPath}/`,
            revice: `${revicePath}/sass`,
        },
        js: {
            src: [
                `${srcPath}/js/**/*.js`
            ],
            concat: 'all.js',
            path: `${distPath}/js/**/*.js`,
            revice: `${revicePath}/js`,
        },
        otherFiles: {
            src: [
                `${srcPath}/**/*`,
                `!${srcPath}/**/*.html`,
                // `!${srcPath}/**/*.ejs`,
                `!${srcPath}/js/**/*.js`,
                `!${srcPath}/style/*`,
                `!${srcPath}/style/**/*.scss`,
                `!${srcPath}/style/**/*.sass`,
            ],
            path: revicePath,
        }
    },



}

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

async function revice() { //不知道為什麼無效
    return gulp.parallel(reviceHtml, reviceSass, reviceJs)
    // done()
}

//   exports.revice = revice;
exports.revice = gulp.series(reviceHtml, reviceSass, reviceJs, reviceCopyFiles);


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
    .pipe($.babel({
      presets: ['@babel/env'],
    }))
    .pipe($.concat(envOptions.javascript.concat))
    .pipe($.if(options.env === 'prod', $.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(envOptions.javascript.path))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
}

function vendorJs() {
    return gulp.src(envOptions.vendors.src)
    .pipe($.plumber())
    .pipe($.concat(envOptions.vendors.concat))
    // .pipe($.if(options.env === 'prod', $.uglify()))
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

function browser() {
    browserSync.init({
        server: {
          baseDir: envOptions.browserSetting.dir,
        // index: "glasses.html",//不加無效??
          reloadDebounce: 2000
        },
                
        port: envOptions.browserSetting.port,
    });
}


function watch() {
    gulp.watch(envOptions.html.src, gulp.series(html));
    // gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    gulp.watch(envOptions.style.src, gulp.series(sass));
    gulp.watch(envOptions.js.src, gulp.series(babel));
    gulp.watch(envOptions.img.src, gulp.series(images));
    // ----------------------------------------------------
    gulp.watch(envOptions.revice.html.src, gulp.series(reviceHtml));
    // gulp.watch(envOptions.html.ejsSrc, gulp.series(layoutHTML));
    gulp.watch(envOptions.revice.style.src, gulp.series(reviceSass));
    gulp.watch(envOptions.revice.js.src, gulp.series(reviceJs));
    gulp.watch(envOptions.revice.img.src, gulp.series(reviceImg));
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

// exports.default =
// exports.revice = gulp.series( watch)