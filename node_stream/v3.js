/* 文件路径格式化 path模块 */
var path = require('path')
var cache = {}
function store(key, value) {
    cache[path.normalize(key)] = value
}
store('a/b', 1)
store('a/../a/b', 2) //本路径与上面一样
console.log(cache)

/* 获取文件名后缀 */
console.log(path.extname('./index.txt'))