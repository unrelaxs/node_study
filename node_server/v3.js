var fs = require('fs')
var http = require('http')
var path = require('path')
var domain = require('domain')
var MIME = {
    '.js': 'application/javascript',
    '.css': 'text/css'
}

function main(argv) {
    var config  = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root    = config.root || '.',
        port    = config.port || '80',
        server

    server = http.createServer(function(request, response){
        var urlInfo = parseUrl(root, request.url)
        //更改1 使用domain统一捕捉异常
        var d = domain.create()
        d.run(function() {
            validateFile(urlInfo.pathNames, function(err, data) {
                if (err) {
                    response.writeHead(404)
                    response.end(err.message)
                } else {
                    response.writeHead(200, {
                        'Content-Type': urlInfo.mime
                    })
                    outPutResponse(urlInfo.pathNames, response)
                }
            })
        })
        d.on('error', function(err) {
            response.writeHead(404)
            response.end(err.message)
            //终止本进程，出发守护进程的 worker.on('exit')
            process.exit(1)
        })
    }).listen(port)

    //本进程被kill,,如daemon.js中 worker.kill()接受信号，关闭本进程
    process.on('SIGINT', function () {
        console.log('守护进程终止')
        server.close(function () {
            console.log('关闭http服务，以及本进程关闭')
            //本进程结束
            process.exit(0);
        });
    });
}

function validateFile(pathNames, calback) {
    //更改，不做并行处理，对磁盘有好处
    (function next(i, len){
        if (i < len) {
            fs.stat(pathNames[i], function(err, stat){
                if (!stat.isFile()) {
                    throw (new Error())
                } else {
                    next(i+1, len)
                }
            })
        } else {
            calback(null, pathNames)
        }
    })(0, pathNames.length)
}

//更改，边读边写，降低服务器内存压力
function outPutResponse(pathNames, writer) {
    var rs
    (function next(i, len){
        if (i < len) {
            rs = fs.createReadStream(pathNames[i])
            rs.pipe(writer, {end: false})
            rs.on('end', function() {
                next(i + 1, len)
            })
        } else {
            writer.end()
        }
    })(0, pathNames.length)

}

function parseUrl(root, url) {
    var base, parts, pathNames;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??')
    }
    console.log(url)
    parts = url.split('/')
    base = parts[0]
    pathNames = parts[1].split(',').map(function(value){
        return path.join(root, base, value)
    })

    return {
        mime: MIME[path.extname(pathNames[0])] || 'text/plain',
        pathNames: pathNames
    }
}

main(process.argv.slice(2))