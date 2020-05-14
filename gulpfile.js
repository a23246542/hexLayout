//gulp 3.9.1
// var gulp = require('gulp');
// gulp.task('hello',function(cb){
//     console.log("hello gulp 3.9.1");
//     cb();
// })
//終端機 gulp hello

// npm i browser-sync --save
// npm install --save gulp-plumber
// npm i minimist gulp-if --save
var gulp = require('gulp');
var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');

function copyHtml(){
    // return gulp.src('.week4/source/**/*')
    // return gulp.src('./**/*')
    return gulp
    .src('./week4/**/*')//搬不到東西
    // .pipe(plumber())
    .pipe(gulp.dest('./public/glasses'));
}

function scss(){
    return gulp
    .src('.week4/source/sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'nested',
        includePaths:['./node_modules/bootstrap/scss'],
    }).on('error',sass.logError))
    // .pipe(plumber())
    .pipe(gulp.dest('./public/glasses/css'))
    .pipe(browserSync.stream());
}

function VendorJs(){
    return gulp.src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',//不用額外載入jquery
        './week4/source/js/**/**.js'//是否有順序問題
    ]).pipe(gulp.dest('./public/glasses/js'))
}

function browserSyncGlasses(){
    browserSync.init({
        server:{
            baseDir:'./public/glasses'
        }
    })
}


// function default(){//default不能拿來用
function defaultGulp(){
    // gulp.task('default',['jade','sass']);
}

// reloadDebounce:2000 讓不會一直整理過於頻繁

exports.copyHtml = copyHtml;
