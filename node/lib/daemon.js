var childProcess = require('child_process'),
    worker;

function spawn(server, config) {
    worker = childProcess.spawn('node', [server, config])
    worker.on('exit', function(code) {
        if (code !== 0) {
            spawn(server, config)
        } else {
            console.log('kill')
            worker.kill()
        }
    })
}

function main(argv) {
    spawn('server.js', argv[0])
    process.on('SIGINT', function(){
        worker.kill()
        process.exit(0)
    })
}
main(process.argv.slice(2))