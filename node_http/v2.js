/* 模拟客户端发起请求 */
var http = require('http')
var url = require('url')
var options = {
    hostname: 'thkcat.com',
    port: 80,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

var request = http.request(options, function(respond) {
    console.log(respond)
})

// request.write('hello word')
// request.end()
http.get('http://thkcat.com/', function (response) {

});

//url解析
console.log(url.parse('http://baidu.com'))
//url拼接去重
url.resolve('http://www.example.com/foo/bar', '../baz');
