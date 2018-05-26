/* 读取文件内容写到文件中 */


var fs = require('fs')

function write(file1, file2) {
    var rs = fs.createReadStream(file1)
    var ws = fs.createWriteStream(file2)
    rs.on('data', function(text) {
        ws.write(text)
    })
    rs.on('end', function(text) {
        ws.end()
    })
}

/*
* 思考，如果ws.write 的写入速度跟不上rs的读取速度，将会导致数据流内存爆仓
* 解决办法，， if (ws.write(text) === false) { rs.pause() }
* 上面代码也就是，，当ws写入出现错误时，应及时停止rs继续读取
* */
function write1(file1, file2) {
    var rs = fs.createReadStream(file1)
    var ws = fs.createWriteStream(file2)
    rs.on('data', function(text) {
        if (ws.write(text) === false) {
            fs.pause()
        }
    })
    rs.on('end', function(text) {
        ws.end()
    })
}

function main(argv) {
    // write(argv[0], argv[1])
    write1(argv[0], argv[1])
}

main(process.argv.slice(2))