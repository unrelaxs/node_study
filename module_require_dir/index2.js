/*NODE_PATH指定模块查找目录
* 跟着命令执行
* jack# cd ~
* jack# pwd
* ==>显示后复制该路径 /Users/jack
* jack# vi ~/.bash_profile
* ==>在最后一行加上: exports = NODE_PATH=/Users/jack/test
* ==>把它放在当前登录用户jack的test目录下, 保存退出
* jack# source ~/.bash_profile
* jack# mkdir test
* jack# cd test
* ##以下做法是创建一个hello3.js文件，并输入js语法
* jack# echo "module.exports=function(){console.log('~/test/node_modules/index2.js')}" > hello3.js
* jack# node 本文件
* ===>会看到输出~/test/node_modules/index2.js
* ===>也就是NODE_PATH指定全局目录生效
* */
var say2 = require('hello3')
say2()