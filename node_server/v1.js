var fs = require('fs'),
    path = require('path'),
    http = require('http');
var domain = require('domain');
var MIME = {
    '.js': 'application/javascript',
    '.css': 'text/css'
}
function main(argv) {
    //加载一个配置文件路径
    var config  = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root    = config.root || '.',
        port    = config.port || 80;
    //创建一个服务并监听端口
    http.createServer(function(request, response){

        //解析请求路径
        var urlInfo = parseUrl(root, request.url)
        //读取路径的内容，并返回
        combineFiles(urlInfo.pathnames, function(err, data) {
            if (err) {
                //访问失败
                response.writeHead(404)
                response.end(err.message)

            } else {
                //访问成功
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                })
                response.end(data)
            }
        })

    }).listen(port)
}

//url  xxx.com/??a.js,b.js
//url  xxx.com/a.js
function parseUrl(root, url) {
    var base, pathnames, parts;

    //xxx.com/a.js
    if (url.indexOf('??') === -1) {
        url = url.replace('/','/??')
    }
    parts = url.split('??')
    base = parts[0] //xxx.com
    pathnames = parts[1].split(',').map(function(value){
        //给多个文件，都拼接成一个新路径
        return path.join(root, base, value)
    })

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    }
}

function combineFiles(pathnames, calback) {
    var outputs = [];
    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], function(err, data) {
                if (err) {
                    calback(err)
                } else {
                    outputs.push(data)
                    next(i+1, len)
                }
            })
        } else {
            calback(null, Buffer.concat(outputs))
        }
    })(0, pathnames.length)
}

//服务从这里开始
main(process.argv.slice(2))