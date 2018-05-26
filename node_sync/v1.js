/*
* 异步执行
* 在主线程运行完，即空闲的时候，子线程才会通知主线程进行执行回调函数
* 下面方便测试，t是当前运行的时间，setTimeout 是一秒后执行回调函数，new Date() - t就是当前时间间隔
*
* */

function compute(num, calback) {
    var count = 0,
        i, j;

    for (i = num; i > 0; i--) {
        for(j = num; j > 0; j--) {
            count ++;
        }
    }
    calback(count);
}
var t = new Date()
setTimeout(function(){
    console.log('通知主线程')
    console.log(new Date() - t);
    //可以看到 时间间距是2000，2秒，而不是1000 1秒执行后的结果
}, 1000)

compute(50000, function(num) {
    console.log('主线程执行完毕')
})
