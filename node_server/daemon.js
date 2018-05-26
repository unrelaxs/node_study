var childProcess = require('child_process'),
    worker;
function spawn(server, config) {
    //创建一个子进程，并执行 node命令 参数是 server 以及config
    worker = childProcess.spawn('node', [server, config])
    //监听子进程结束
    worker.on('exit', function(code) {
        //终止信号不是零
        if (code !== 0) {
            console.log('重启子进程')
            //重启子进程
            spawn(server, config)
        }
    })
}
function main(argv) {
    //启动并监听子进程
    spawn('v3.js', argv[0])
    //监听外部信号，如果终止本守护进程,则
    process.on('SIGINT', function() {
        console.log('守护进程结束')
        //必须关闭子进程
        worker.kill()
        //不重启子进程
        process.exit(0)
    })
}
main(process.argv.slice(2))