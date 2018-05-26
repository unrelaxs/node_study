/* fs是nodejs 内置文件操作模块 */
var fs = require('fs')

function copy(file, file1) {
    fs.writeFileSync(file1, fs.readFileSync(file))
}

function copy1(file, file1) {
    fs.createReadStream(file).pipe(fs.createWriteStream(file1))
}

function main(argv) {
    // copy(argv[0], argv[1])
    copy1(argv[0],argv[1])
}

main(process.argv.slice(2));
