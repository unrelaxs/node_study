var http = require('http')
var zlib = require('zlib')
var options = {
    hostname: 'localhost',
    port: 8125,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
var request = http.request(options, function(response) {
    var body = [],
        bin = ''
    //数据流读取响应内容
    response.on('data', function(data) {
        body.push(data)
    })
    //读取响应完毕后
    response.on('end', function() {
        /* 数据是二进制码 */
        bin = Buffer.concat(body)
        console.log('解压前')
        console.log(bin.toString())
        console.log(bin.toString().length)
        if (response.headers['Content-encoding'] = 'gzip') {
            zlib.gunzip(bin, function(err, data) {
                console.log('解压后')
                console.log(bin.toString())
                console.log(bin.toString().length)
            })
        } else {
            console.log(bin.toString())
        }
    })
}).end()
