
const minimist = require('minimist'); // 用來讀取指令轉成變數
const envOptions = {
  string: 'env',//或['env']  /?定義要傳入的內容是什麼關鍵詞 or這個env後面要帶的轉字串
  default: { env: 'development' } //寫env的預設值(環境)
};
// process.argv.slice(2)取得命令行參數
const options = minimist(process.argv.slice(2), envOptions);


//執行指令 gulp --env {參數}這樣就能帶入至option設定

exports.options = options;


// ---------補充Roya--
// 也可以用這個獲取命令行參數 只是用卡斯柏老師的方法就不用 每次打指令還要另外打參數
// const argv = parseArgs(process.argv.slice(2)).env;
// .pipe(gulpif(argv === 'production', cleanCSS({ compatibility: 'ie8' }))) 