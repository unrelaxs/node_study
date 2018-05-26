/*
* 创建http服务，并监听8123端口
* 当有人访问时候，回调接受request,以及respond
* request 以及 respond请求是一个数据流，
* repond回应头以及body内容
* */

var http = require('http')
http.createServer(function(request, respond){
    console.log(request.method)
    console.log(request.headers)

    var data = []
    var body = ''
    request.on('data', function(chunk){
        data.push(chunk)
    })

    request.on('end', function() {
        body = Buffer.concat(data)
        console.log(body.toString())
        respond.write(body)
    })

    respond.writeHead(200, {
        'Content-type': 'text-plain'
    })
    respond.end("hello word \n")
}).listen(8123)