/* 通过子进程，进行文件复制 */
var child_process = require('child_process')
var util = require('util')

function copy(source, target, calback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target),
        calback
    )
}

function main(argv) {
    copy(argv[0], argv[1], function() {
        console.log('拷贝完毕')
    })
}

// main(process.argv.slice(2))

function log() {
    process.stdout.write(
        util.format.apply(util, arguments )+ '\n'
    )
}

log()
