const path=require("path")

console.log(path.join(__dirname,"aaa",".js"))
console.log(path.resolve(__dirname,"aaa",".js","/"))

console.log(path.basename("1.min.aa.js",".aa.js"))//基本文件名
console.log(path.extname("1.min.aa.js","1.min.aa"))//后缀
console.log(path.dirname(__dirname))//父路径
console.log(__dirname)