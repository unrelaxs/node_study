// var child_process = require('child_process')
// var child = child_process.spawn('node', [ 'child.js' ]);
//
// child.kill('SIGTERM');

process.stdin.resume();

function handle(signal) {
    console.log(`Received ${signal}`);
    process.exit(0)
}

process.on('SIGINT', handle);
// process.on('SIGTERM', handle);
