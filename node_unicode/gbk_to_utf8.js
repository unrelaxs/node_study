
var iconv = require('iconv-lite')
var fs = require('fs')
function translate(filename) {
    var bin = fs.readFileSync(filename)
    return iconv.decode(bin, 'gbk')
}

function main(argv) {
    return translate(argv[0])
}
/* 将读取gbk_test文件转码 */
console.log(main(process.argv.slice(2)))