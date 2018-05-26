var fs = require('fs')

function copy(file, file1) {
    fs.writeFileSync(file1, fs.readFileSync(file))
}

function main(argv) {
    copy(argv[0], argv[1])
}

main(process.argv.slice(2));
