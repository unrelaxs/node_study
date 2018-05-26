var childProcess = require('child_process');
var util = require('util')

function copy(source, target, callback) {
    childProcess.exec(
        util.format(
            'cp',
            source,
            target,
        ),
        callback
    )
}

copy('test.txt', 'say.txt', function(result) {
    console.log(result)
    console.log('finished')
})