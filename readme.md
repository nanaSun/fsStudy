# 不知Stream为何物的探索之旅

流都是专门运作在字符串和 Buffer（或 Uint8Array）对象上的。

感觉要分析流(stream)就先分析文件系统(file system)和缓冲(buffer)。

那么就先从文件和文件夹操作开始说吧。

流是个比较抽象的概念，很难解释他是个啥，为什么存在。

## file system

万事开头难，为了理解流的概念，我们先从攻克fs(file system)开始吧！


对于文件/文件夹fs的常用操作，大概有以下几个：

* 文件夹操作:

|操作|同步|异步|
|:--:|:--:|:---:|
|查询|accessSync|access|
|新建|mkdirSync|mkdir|
|删除|rmdirSync|rmdir|

* 文件操作

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

读取目内容: fs.readdirSync

各种操作之前预检查文件或文件夹状态的方法--fs.stat,它返回的参数如下:

fs.stats

|参数|用途|
|:--:|:--:|
|dev|文件的设备的数值型标识|
|mode|文件类型与模式的位域|
|nlink|文件的硬链接数量|
|uid|文件拥有者的数值型用户标识|
|gid|拥有文件的群组的数值型群组标识|
|rdev|如果文件是一个特殊文件，则返回数值型的设备标识|
|ino|文件系统特定的文件索引节点数值|
|size|文件的字节大小|
|atimeMs|文件最后一次被访问的时间戳|
|mtimeMs|文件最后一次被修改的时间戳|
|ctimeMs|文件状态最后一次被改变的时间戳|
|birthtimeMs|文件的创建时间戳|
|atime|文件最后一次被访问的时间|
|mtime|文件最后一次被修改的时间|
|ctime|文件状态最后一次被改变的时间|
|birthtime|文件的创建时间|

|方法|用途|
|:--:|:--:|
|isBlockDevice|文件的设备的数值型标识|
|isCharacterDevice|文件类型与模式的位域|
|isDirectory|文件的硬链接数量|
|isFIFO|先进先出（FIFO）管道|
|isFile|普通文件|
|isSocket|socket|
|isSymbolicLink|符号链接|

## Buffer

因为JavaScript语言没有读取或操作二进制数据流的机制，因此出现了Buffer！

Buffer就是处理各类二进制的问题。

Buffer有几个特性：
* 大小固定、且在 V8 堆外分配物理内存（应该是考虑到了性能）。
* 大小在创建时被确定，因此一旦创建，无法调整。

Buffer的一些方法
|方法|用途|
|:--:|:--:|
|from|用于创建一个新的 Buffer|
|alloc|给新Buffer分配字节大小|
|concat|合并各个buffer|

当我们在fs中用到读写功能的时候，我们需要用buffer来存储二进制，从而完成读写功能。

## Stream

粗暴地过了下fs和Buffer，我要开始正题了Stream（流）！

首先，科普两点：
* **Stream可以是可读的、可写的、可读写的。**
* **所有的Stream是基于`EventEmitter`的实例。**

流有四种类型

* Writable - 可写入数据的流
* Readable - 可读取数据的流
* Duplex - 可读又可写的流
* Transform - 在读写过程中可以修改或转换数据的Duplex流

***我感觉流是对于Buffer的一个封装，如果说Buffer是从来处理二进制的，那么流是用来管理Buffer的，让数据有节制地进入Buffer，离开Buffer。*** （不知道这个理解是否正确）