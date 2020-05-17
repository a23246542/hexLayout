const srcPath = './src/mydev';
const revicePath= "./src/revice"
const distPath = './public';
const nodePath = './node_modules';

let envOptions = {
    string: 'env',//或['env']  /?定義要傳入的內容是什麼關鍵詞 or這個env後面要帶的轉字串
    default: { env: 'development' }, //寫env的預設值(環境)
    conyFile:{
        src:[
            `${srcPath}/glasses_rwd/*`,
            `${srcPath}/resume_template/*`,
            // `${revicePath}/**/*`
        ],
        path:[
            `${revicePath}/glasses_rwd`,
            `${revicePath}/resume_template`,
        ]
    },
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
                `${srcPath}/glasses_rwd/**/*.html`,
                `${srcPath}/resume_template/**/*.html`,
                // `${revicePath}/**/*`
            ],
            path:[
                `${revicePath}/glasses_rwd`,
                `${revicePath}/resume_template`,
            ]
        },
        style:{
            src:[
                `${srcPath}/glasses_rwd/sass/**/*.scss`,
                `${srcPath}/resume_template/sass/**/*.scss`,
                // `${revicePath}/**/*`
            ],
            path:[
                `${revicePath}/glasses_rwd/sass`,
                `${revicePath}/resume_template/sass`,
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
        }
    }

}