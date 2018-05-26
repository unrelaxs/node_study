/* fs是nodejs 内置文件操作模块 */
var fs = require('fs')

/* 一次性把file文件读取加载到内存，然后输出到file1中 */
function copy(file, file1) {
    fs.writeFileSync(file1, fs.readFileSync(file))
}

/* 读取file文件一点就往file1文件写一点，直到写完为止 */
function copy1(file, file1) {
    fs.createReadStream(file).pipe(fs.createWriteStream(file1))
}

function main(argv) {
    // copy(argv[0], argv[1])
    copy1(argv[0],argv[1])
}

main(process.argv.slice(2));
