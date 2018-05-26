var fs = require('fs')
function readFile(filename) {
    var bin = fs.readFileSync(filename)
    /* bom的二进制码 分别是 EF BB BF */
    if (bin[0] == '0xEF' && bin[1] == '0xBB' && bin[2] == '0xBF') {
        bin = bin.slice(3)
    }
    return bin.toString('utf-8')
}

function main(argv) {
    return readFile(argv[0])
}
console.log(main(process.argv.slice(2)))