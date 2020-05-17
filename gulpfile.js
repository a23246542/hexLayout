
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');

const srcPath = './src/mydev';
const revicePath= "./src/revice"
const distPath = './public';
const nodePath = './node_modules';

let envOptions = {
    reviceFile:{
        assets:{
            src:[
                `${srcPath}/asset/**/*`,
            ],
            path:[
                `${revicePath}/asset`,
            ]
        },
        html:{
            src:[
                // `${srcPath}/glasses_rwd/**/*.html`,
                // `${srcPath}/resume_template/**/*.html`,
                `${srcPath}/*/*.html`,

            ],
            path:[
                // `${revicePath}/glasses_rwd`,
                // `${revicePath}/resume_template`,
                `${revicePath}`,
            ]
        },
        style:{
            src:[
                // `${srcPath}/glasses_rwd/sass/**/*.scss`,
                // `${srcPath}/resume_template/sass/**/*.scss`,
                `${srcPath}/*/sass/**/*`,
            ],
            path:[
                // `${revicePath}/glasses_rwd/sass`,
                // `${revicePath}/resume_template/sass`,
                `${revicePath}/*/sass`,
            ]
        },
        js:{
            src:[
                `${srcPath}/glasses_rwd/js/**/*.js`,
                `${srcPath}/resume_template/js/**/*.js`,
                // `${revicePath}/**/*`
            ],
            path:[
                `${revicePath}/glasses_rwd/js`,
                `${revicePath}/resume_template/js`,
            ]
        },
        copyFile:{
            resume_template:{
                src:`${srcPath}/resume_template`,
                path:`${distPath}/resume_template`
            },
            glasses_rwd:{
                src:`${srcPath}/glasses_rwd`,
                path:`${distPath}/glasses_rwd`
            }
        }
    }

}

function reviceAsset(){
    return gulp.src('./src/mydev/assets/**/*')
    .pipe(gulp.dest('./src/revice/assets'))
    
}

  function reviceHtml(){
    return gulp.src(`${envOptions.copyFile.html.src}`)
    .pipe(gulp.dest(envOptions.reviceFile.html.path))
  }

  function reviceSass(){
    // return gulp.src(`mydev下resume.glass的sass資料夾`)
    return gulp.src(envOptions.reviceFile.style.src)
    .pipe($.plumber())
    .pipe($.stripJsonComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    // .pipe(gulp.dest(`revise下的resume.glass的sass資料夾`))
    .pipe(gulp.dest(envOptions.reviceFile.style.path))
  }

  function reviceJs(){
    return gulp.src(envOptions.reviceFile.js.src)
    .pipe($.plumber())
    .pipe($.stripComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest(envOptions.reviceFile.js.path))
  }

  async function revice(){
    return gulp.parallel(reviceHtml,reviceSass,reviceJs,reviceAsset)
    // done()
  }

//   exports.revice = revice;
exports.revice = gulp.series(reviceHtml,reviceSass,reviceJs,reviceAsset);