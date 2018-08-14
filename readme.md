# 流

流是基于`EventEmitter`的实例。

流都是专门运作在字符串和 Buffer（或 Uint8Array）对象上的。

感觉要分析流(stream)就先分析文件系统(file system)和缓冲(buffer)。

先从文件和文件夹操作开始说吧。

流是个比较抽象的概念，很难解释他是个啥，为什么存在。

### file system

万事开头难，为了理解流的概念，我们先从攻克fs(file system)开始吧！


对于文件/文件夹的常用操作，大概有以下几个：

文件夹
|操作|同步|异步|
|:--:|:--:|:---:|
|查询|accessSync|access|
|新建|mkdirSync|mkdir|
|删除|rmdirSync|rmdir|

文件
|操作|同步|异步|
|:--:|:--:|:---:|
|打开|openSync|open|
|查看|readSync|read|
|查看|readFileSync|readFile|
|写入|writeSync|write|
|写入|writeFileSync|writeFile|
|追加写入|appendFileSync|appendFile|
|复制|copyFileSync|copyFile|
|删除|unlinkSync|unlink|

其他方法

是目录还是文件：fs.stat

这些操作都有异步和同步的方法