var http = require('http')
var options = {
    hostname: 'www.thkcat.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencode'
    }
}
var request = http.request(options, function(respond){
    console.log(respond)
})
request.write('hello word');
request.end();