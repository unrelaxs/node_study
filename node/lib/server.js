var fs      = require('fs'),
    http    = require('http'),
    path    = require('path'),
    domain  = require('domain'),
    server,
    MIME    = {
        '.js': 'application/javascript',
        '.css': 'text/css'
    }

function main(argv) {
    var config  = JSON.parse(fs.readFileSync(argv[0])),
        root    = config.root || '.',
        port    = config.port || '80';
    server = http.createServer(function(request, response){
        var d = domain.create()
        d.run(function() {
            var urlInfo = parseUrl(request.url, root)
            validateFile(urlInfo.pathNames, function(files){
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                })
                outputsFile(files, response)
            })
        })
        d.on('error', function(error) {
            response.writeHead(404)
            response.end(error.message)
            process.exit(1)
        })
    }).listen(port)
    process.on('SIGINT', function(){
        server.close(function(){
            process.exit(0)
        })
    })
}

function parseUrl(url, root) {
    var base, parts, pathNames;
    if (url.indexOf('??') == '-1') {
        url = url.replace('/','/??')
    }
    parts = url.split('??')
    base = parts[0]
    pathNames = parts[1].split(',').map(function(value){
        return path.join(root, base, value)
    })
    return {
        mime: MIME[path.extname(pathNames[0])],
        pathNames: pathNames
    }
}

function validateFile(pathNames, calback) {
    (function next(i, len){
        if (i < len) {
            fs.stat(pathNames[i], function(err, stat){
                if(!stat.isFile()) {
                    throw(new Error('it is not a file: '+stat))
                } else {
                    next(i + 1, len)
                }
            })
        } else {
            calback(pathNames)
        }
    })(0, pathNames.length)
}

function outputsFile(files, writer) {
    var rs;
    (function next(i, len){
        if (i < len) {
            rs = fs.createReadStream(files[i])
            rs.pipe(writer, {end: false})
            rs.on('end', function() {
                next(i +1 ,len)
            })
        } else {
            writer.end()
        }
    })(0, files.length)
}

main(process.argv.slice(2))