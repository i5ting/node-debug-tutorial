node-debug tutorial
===================

调试

## node debug

V8 提供了一个强大的调试器，可以通过 TCP 协议从外部访问。Nodejs提供了一个内建调试器来帮助开发者调试应用程序。想要开启调试器我们需要在代码中加入debugger标签，当Nodejs执行到debugger标签时会自动暂停（debugger标签相当于在代码中开启一个断点）。

### hello world例子
代码如下：

see `helloword-debug.js`

	var hello = 'hello';
	var world = 'nodejs';

	debugger;

	var hello_world = hello + ' ' + world;
	console.log(hello_world);
	

执行命令：`node debug helloword-debug.js` 就可以进入调试模式。

当然，首先需要在程序代码中手动添加中断debugger; ， 这样当以调试模式运行时，程序会自动中断，然后等候你调试，就像GDB一样，可以用help命令查看自己都可以使用哪些调试命令。

```
node-debug-tutorial git:(master) ✗ node debug helloword-debug.js
< debugger listening on port 5858
connecting... ok
break in helloword-debug.js:1
  1 var hello = 'hello';
  2 var world = 'nodejs';
  3 
debug> help
Commands: run (r), cont (c), next (n), step (s), out (o), backtrace (bt), setBreakpoint (sb), clearBreakpoint (cb),
watch, unwatch, watchers, repl, restart, kill, list, scripts, breakOnException, breakpoints, version
debug> 
debug> n
break in helloword-debug.js:2
  1 var hello = 'hello';
  2 var world = 'nodejs';
  3 
  4 debugger;
debug> repl
Press Ctrl + C to leave debug repl
> hello
'hello'

```
此时repl打开js上下文即时求值环境，和chrome的debug的console是一样的。


如果想退出，请按下`ctrl + c`,这样就可以返 到debug模式

```

debug> n
break in helloword-debug.js:4
  2 var world = 'nodejs';
  3 
  4 debugger;
  5 
  6 var hello_world = hello + ' ' + world;
debug> n
break in helloword-debug.js:6
  4 debugger;
  5 
  6 var hello_world = hello + ' ' + world;
  7 console.log(hello_world);
  8 
debug> n
break in helloword-debug.js:7
  5 
  6 var hello_world = hello + ' ' + world;
  7 console.log(hello_world);
  8 
  9 });
debug> repl
Press Ctrl + C to leave debug repl
> hello_world
'hello nodejs'
> 

```

如果想终止调试，请按下2次`ctrl + c`键

### 命令说明

| 可选项 | 用途    | 
|-------|------------| 
| run	| 执行脚本,在第一行暂停| 
| restart	| 重新执行脚本| 
| cont, c	| 继续执行,直到遇到下一个断点| 
| next, n	| 单步执行| 
| step, s	| 单步执行并进入函数| 
| out, o	| 从函数中步出| 
| setBreakpoint(), sb()	| 当前行设置断点| 
| setBreakpoint(‘f()’), sb(...)| 在函数f的第一行设置断点| 
| setBreakpoint(‘script.js’, 20), sb(...)| 在 script.js 的第20行设置断点| 
| clearBreakpoint, cb(...)| 清除所有断点| 
| backtrace, bt| 显示当前的调用栈| 
| list(5)| 显示当前执行到的前后5行代码| 
| watch(expr)| 把表达式 expr 加入监视列表| 
| unwatch(expr)|  把表达式 expr 从监视列表移除 | 
| watchers| 显示监视列表中所有的表达式和值| 
| repl| 在当前上下文打开即时求值环境| 
| kill| 终止当前执行的脚本| 
| scripts| 显示当前已加载的所有脚本| 
| version| 显示v8版本| 

这里就和gdb等调试器一模一样了

Manual: http://nodejs.org/api/debugger.html

回归一下，debug的2种模式：

- js上下文即时求值环境模式
- debug断点模式

### FAQ

注意,如果出现

	< Failed to open socket on port 5858, waiting 1000 ms before retrying
	
请结束掉所有debug进程

	ps -ef|grep debug-brk|awk '{print $2}'|xargs kill -9

### node-inspector

上面这种方式稍微有些麻烦，我们写JS代码调试的时候一般都用FireBug或谷歌浏览器内置的调试工具，nodejs程序当然也可以这样子来调试，但是首先需要安装一个node-inspector的东西

node-inspector是通过websocket方式来转向debug输入输出的。因此，我们在调试前要先启动node-inspector来监听Nodejs的debug调试端口。


这个需要用npm来安装，只需要执行下列语句：

	npm install -g node-inspector
	
安装完成之后，通常可以直接这样启动在后台：

	node-inspector &
	
默认会监听8080端口，当然，也可能通过使用--web-port参数来修改。然后，在执行node程序的时候，多加个参数：--debug-brk, 如下：

	node --debug-brk app.js
	
或者

	node-debug app.js

控制台会返回“debugger listening on port 5858”， 现在打开浏览嚣，访问http://localhost:8080，这时候就会打开一个很像Chrome内置调试工具的界面，并且代码断点在第一行，下面就可以使用这个来调试了。


![](./images/debug.png)

- 增加断点，查看调用栈，变量等
- 使用console打印查看日志

使用方法和chrome的inspect element调试web开发是一样的。

调试还是很方便的，而且可以异地调试。
  
	
https://github.com/baryon/tracer
http://www.habdas.org/node-js-debugging-primer/