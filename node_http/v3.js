// v3.js是服务端监听，并压缩响应返回
//v4.js是客户端发送请求，并解压响应返回的内容
//压缩
var http = require('http')
var zlib = require('zlib')
http.createServer(function(request, response) {
    var i = 1024,
        data = '';
    while(i--) {
        data += 'a'
    }

    //判断客户端头，是否接受gzip压缩
    if ((request.headers["accept-encoding"] || '').indexOf('gzip') !== -1) {
        console.log('正在压缩')
        zlib.gzip(data, function (err, data) {
            response.writeHead(200, {
                'Content-type': 'text/plain',
                'Content-Encoding': 'gzip'
            })
            response.end(data)
        })
    } else {
        console.log('不支持压缩')
        response.writeHead(200, {
            'Content-type': 'text/plain'
        })
        response.end(data)
    }
}).listen(8125)