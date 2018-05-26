var http = require('http')
http.createServer(function(request, respond) {
    console.log(request.method)
    console.log(request.headers)
    respond.writeHead(200, { 'Content-Type': 'text-plain' });
    respond.end("hello word \n");
}).listen('8123')