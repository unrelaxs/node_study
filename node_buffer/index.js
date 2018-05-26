/*
js只有字符类型
nodejs 提供 buffer类型 对二进制操作 */
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
console.log(bin)
console.log(bin.toString('utf-8'))
/* buffer类型与string互相转换 */
var bin = new Buffer('haha', 'utf-8');
console.log(bin)
bin[0] = 0x77
console.log(bin.toString('utf-8'))

/* buffer特性，buffer类型变量被更改，其他所引用这个变量，也会改变 */
/* 而string区别在于，string类型变量更改后，他会创建一个新的string类型，互不相干 */
/* 因此要保证互不干扰，应该使用copy进行复制 */
var bin1 = bin
var bin2 = new Buffer(bin.length)
bin.copy(bin2)

console.log('原来样子')
console.log(bin)
console.log('bin发生改变')
bin[0] = 0x88
console.log('bin改变后')
console.log(bin) //发生改变
console.log('bin1')
console.log(bin1) //bin1也改变
console.log('bin2')
console.log(bin2)
