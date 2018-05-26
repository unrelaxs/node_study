定义一个node-echo命令，并把输入的参数全打印出来。<br>
====
用法说明：<br>
----
1. bin/node-echo这是一个命令程序<br>
    在此文件中，第一第二行必须，<br>
     `#! /usr/bin/env node`
     上一行 是使用env环境，调用nodejs环境来编译解析本程序。<br>
      如果不确定上面命令是否生效，可以在终端执行<br>
        `jack# env node<br>`
        <br>
     `'use strict';`
     上一行 使用严格书写方式，因为很多程序员的写法各不相同。因此需要统一，否则系统解析不出来。<br>
     建议参考eslint这个严格书写规范语法<br>
2. package.json<br>
    dependencies 是定义本程序中，需要定义的依赖，譬如argv[用于获取命令行的参数]<br>
        当使用npm install 时候，会在本程序目录下/node_modules安装这些依赖。<br>
    bin 是定义本程序的命令。<br>
<br>
用法<br>
说明. 由于我使用mac系统，因此默认的命令存放/usr/local/bin/下。<br>
      其他系统请查阅下v

终端执行：<br>
----
`
jack# cd ~/nodejs/node-echo/bin<br>
jack# pwd<br>
====> /usr/jack/nodejs/node-echo/bin<br>
====>复制上面的绝对路径<br>
jack# sudo ln -s /usr/jack/nodejs/node-echo/bin/node-echo /usr/local/bin/node-echo<br>
====>说明：创建一个软连接把本目录下/node-echo存放到系统默认存放命令的目录下/usr/local/bin/node-echo <br>
jack# sudo chmod +x /usr/local/bin/node-echo <br>
jack# node-echo hello word <br>
====>调用node-echo命令，输入参数 hello word,,屏幕会显示hello word<br>
`

发布说明：
----
1. 查看当前源，由于地理位置，使用了淘宝源，<br>
    `jack# pm config get registry`
2. 替换官方源 <br>
    `jack# npm config set registry https://registry.npmjs.org/`
3. 在官网创建一个账号unrelaxs 并且 邮箱进行验证后 <br>
    `jack# npm adduser`<br>
    #根据提示操作完后 <br>
    `jack# npm whoami`<br>
    `jack# npm login`
4. 发布
    #确保当前的包node-echo根目录下有package.json <br>
    #其中 name属性必须是在npm上没有的，因为这是独一无二，我建议是用自己账号名-包名：unrelaxs-npm-echo <br>
    #如果执行npm publish报错，you have not permission to publish '包名', 则必须改name属性值，确保unique <br>
    `jack# cd ~/nodejs/node-echo`<br>
    `jack# npm publish`
    
    
