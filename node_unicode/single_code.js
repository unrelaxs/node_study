/* 使用单字节码 ， 在不知文件编码情况下，避免修改某文件内容出现乱码 */
var fs = require('fs')
function readFile(filename) {
    /* binary单字节 */
    var bin = fs.readFileSync(filename, 'binary')
    bin.replace('is', 'is not')
    /* 下面这一句可以看出，控制台是乱码，因为他是gbk */
    console.log(bin)
    /* 但是我保存后，在打开gbk_test 这个文件没有乱码，这就是单字节编码的好处*/
    fs.writeFileSync(filename, bin, 'binary')
}
function main(argv) {
    return readFile(argv[0])
}
console.log(main(process.argv.slice(2)))