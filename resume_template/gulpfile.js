
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');

const srcPath = './src';
const revicePath= "./revice"
const distPath = './public';
const nodePath = '../node_modules';

let envOptions = {
    html: {
        src: [
          `${srcPath}/**/*.html`,
        ],
        // ejsSrc: [
        //   `${srcPath}/**/*.ejs`,
        // ],
        revice:revicePath,
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
    

}

function reviceAsset(){
    return gulp.src('./src/mydev/assets/**/*')
    .pipe(gulp.dest('./src/revice/assets'))
    
}

  function reviceHtml(){
    return gulp.src(envOptions.html.src)
    .pipe(gulp.dest(envOptions.html.revice))
  }

  function reviceSass(){
    // return gulp.src(`mydev下resume.glass的sass資料夾`)
    return gulp.src(envOptions.style.src)
    .pipe($.plumber())
    .pipe($.stripJsonComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    // .pipe(gulp.dest(`revise下的resume.glass的sass資料夾`))
    .pipe(gulp.dest(envOptions.style.revice))
  }

  function reviceJs(){
    return gulp.src(envOptions.js.src)
    .pipe($.plumber())
    .pipe($.stripComments({
      whitespace:false
    }))
    .pipe($.removeEmptyLines())
    .pipe(gulp.dest(envOptions.js.revice))
  }

  async function revice(){
    return gulp.parallel(reviceHtml,reviceSass,reviceJs)
    // done()
  }

//   exports.revice = revice;
exports.revice = gulp.series(reviceHtml,reviceSass,reviceJs);