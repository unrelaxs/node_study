var fs = require('fs')
var path = require('path')
/* 同步遍历 */
function travel(dir, calback) {
  fs.readdirSync(dir).forEach(function(file) {
    var filename = path.join(dir, file);
    if (fs.statSync(filename).isDirectory()) {
        travel(filename, calback)
    } else {
        calback(filename)
    }
  })
}

/* 异步遍历 */
function travelSync(dir, calback, finish) {
    fs.readdir(dir, function(err, files) {
        (function next(i){
            if (i < files.length) {
                var filename = path.join(dir, files[i])
                fs.stat(filename, function(err, stat) {
                    if (stat.isDirectory()) {
                        travelSync(filename, calback, function() {

                        })
                    } else {
                        calback(filename)
                    }
                    next(i+1)
                })
            } else {
                finish && finish();
            }
        }(0))
    })
}

function main(argv) {
    // travel(argv[0], function(filename){
    //     console.log(filename)
    // })
    travelSync(argv[0], function(filename){
        console.log(filename)
    })
}

main(process.argv.slice(2))