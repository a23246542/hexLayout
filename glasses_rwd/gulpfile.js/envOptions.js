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
        // path: distPath,
        path:`${distPath}/`
    },
    style: {
        src: [
            `${srcPath}/sass/all.scss`,
        ],
        outputStyle: 'expanded',
        includePaths: [
            `${nodePath}/bootstrap/scss`,
        ],
        path: `${distPath}/css`,
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
        src: [
            // distPath,??images也會清掉
            `${distPath}/**/*`,
            `!${distPath}/images`            
        ]
    },
    browserSetting: {
        // dir: `${distPath}/*.html`,
        dir:distPath,
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

exports.envOptions = envOptions;//!!要匯出才讀得到