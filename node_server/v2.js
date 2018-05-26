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
        port    = config.port || '80'

    http.createServer(function(request, response){
        var urlInfo = parseUrl(root, request.url)
        //更改1 使用domain统一捕捉异常
        var d = domain.create()
        d.run(function() {
            combileFile(urlInfo.pathNames, function(err, data) {
                if (err) {
                    response.writeHead(404)
                    response.end(err.message)
                } else {
                    response.writeHead(200, {
                        'Content-Type': urlInfo.mime
                    })
                    response.end(data)
                }
            })
        })
        d.on('error', function(err) {
            response.writeHead(404)
            response.end(err.message)
            //马上退出
            process.exit(0)
        })
    }).listen(port)
}

function combileFile(pathNames, calback) {
    var outPuts = [],
        i = 0,
        len = pathNames.length,
        rs;
    //更改 并行处理
    for(; i < len; i ++) {
        (function (){
            rs = fs.createReadStream(pathNames[i])
            rs.on('data', function(chunk){
                outPuts.push(chunk)
            })
            rs.on('end', function(text){
                calback(null, Buffer.concat(outPuts))
            })
        })(i)
    }
}

function parseUrl(root, url) {
    var base, parts, pathNames;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??')
    }
    parts = url.split('??')
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