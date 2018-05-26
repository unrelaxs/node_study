//nodejs的异常处理

function async(fn) {
    setTimeout(function(){
        fn()
        //由于没有捕捉异常，导致下面不会执行
        console.log('处理完毕')
    }, 200)
}

function test() {
    //由于fn函数不存在，因此抛出异常
    async(fn)
}
// test()

function async1(fn, calback) {
    setTimeout(function(){
        try {
            fn()
        } catch(err) {
            calback(err)
            return false
        }
        calback(false, '没有异常')
    }, 200)
}

function test1() {
    async1(null, function(err,data) {
        if (err) {
            console.log('有个错误：'+err.message.toString())
        } else {
            console.log(data)
        }

        /*下面代码如果出现这种情况下
        * 针对下面，需要经常判断err的情况
        * 使用domain子域模块，在子域下可以任意抛出异常
        * 请查看test2例子
        * */
        if (err) {

        } else {
            async1(null, function(err, data){
                if (err) {

                } else {
                    async1(null, function(err, data){
                        if (err) {

                        } else {

                        }
                    })
                }
            })
        }
    })
}
// test1()

var domain = require('domain')
function async2(fn, calback) {
    setTimeout(function(){
        fn()
        calback('完毕')
    }, 200)
}
function test2() {
    var d = domain.create()
    d.on('error', function(err) {
        console.log('有一个错误')
    })
    d.run(function() {
        async2(function(){console.log('执行')}, function(data){
            async2(null, function(data1){
                console.log(data1)
            })
        })
    })
}

test2()