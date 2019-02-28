const fs = require('fs');

fs.readdir('./src',function(err,files){
    let fileList = files.splice(',');
    let result = {};

    fileList.forEach(item => result[item] = `./dist/${item}/index.js`)

    // 生成webpack多入口
    fs.writeFileSync (
        './build/entry.js',
        `module.exports = ${JSON.stringify(result)}`
    );
});
