/*
* 包的加载模块方式与 require('./lib/main')对等。
* 但是为了测试package.json指定的main入口文件是否生效，暂时用绝对路径
* 相当于把test.js如果放在别的目录下，暂时这么写绝对路径
*
* */
var Html = require('/Users/jack/code/nodejs/node_package')
console.log(Html.creat())