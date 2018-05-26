/* 只读文件内容 */
var fs = require('fs')
function readFile(filename) {
    /* 创建读取文件的数据流 */
    var stream = fs.createReadStream(filename)
    console.log('-------------准备读取------------')
    /* 监听当读到文件内容事件 */
    stream.on('data', function(text) {
        /* 数据流读取的是二进制数据，是buffer类型，因此使用toString并且utf-8编码转换 */
        console.log(text.toString('utf-8'))
    })

    /* 监听当读取完毕事件 */
    stream.on('end', function() {
        console.log('---------读取完毕----------')
        // cleanUp()
    })
}

function main(argv) {
    readFile(argv[0])
}
main(process.argv.slice(2))
