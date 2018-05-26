var arr = [1 , 2, 3]
function syncRun(calback) {
    var i = 0;
    for (; i< arr.length; i++) {
        arr[i] = ++arr[i]
    }
    calback(arr)
}

// syncRun(function(arr) {
//     console.log(arr)
// });
console.log(1);

function async(value, calback) {
    setTimeout(function(){
        calback(value)
    }, 0)
}

//该循环异步执行，是执行完后返回在执行下一步才开始
function test(){
    (function next(i, len, calback){
        if (i < len) {
            async(arr[i], function(value){
                arr[i] = value
                next( i + 1, len, calback)
            })
        } else {
            calback()
        }
    })(0, arr.length, function(){
        console.log(2)
    })
}


console.log(3)

//该循环异步执行，是并行循环处理，并异步执行完后，执行回调
function test1() {
    (function next(i, len, count, calback) {
        for (i; i < len; i++) {
            (function(i){
                async(arr[i], function(value){
                    arr[i] = value
                    if (++count === len) {
                        calback()
                    }
                })
            }(i))
        }
    })(0, arr.length, 0, function(){
        console.log('异步完毕')
    })
}
test1()
console.log(4)