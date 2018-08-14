let fs=require('fs')
let path=require('path')
//都是Sync同步
/**
 * 读取文件
 */
//默认结果类型encoding:null 默认buffer
//不存在会报错
//内容整体 内存（小文件），大的文件操作流
// let r = fs.readFileSync(path.join(__dirname,"module.js"),{encoding:'utf-8',flag:'r'});
// //console.log(r)
// let r1=new Promise(function(resolve,reject){
//     fs.readFile(path.join(__dirname,"module1.js"),{encoding:'utf-8',flag:'r'},function(err,data){
//         //console.log(err,data)
//         resolve(data)
//         reject(err)
//     })
// })
// r1.then((data)=>{
//     console.log(data)
// },err=>{
//     console.log(err)
// })
/**
 * 写入文件
 */
//Buffer.from({data:1}.toString())
// fs.writeFile(path.join(__dirname,"1.txt"),'{data:1}',function(err){
//     console.log(err)
// })
// fs.appendFile(path.join(__dirname,"1.txt"),'{data:1}',function(err){
//     console.log(err)
// })
/**
 * 复制文件
 */
// fs.copyFile(path.join(__dirname,"1.txt"),'{data:1}',function(err){
//     console.log(err)
// })
// fs.open(path.join(__dirname,"1.txt"),"r",(err,fd)=>{
//     let buffer=Buffer.alloc(7)
//     // 0 buffer 读取那个地方
//     // 5 写入多长
//     // 1 从文件的那个位置开始读取
//     fs.read(fd,buffer,0,7,1,(err,bytesRead)=>{
//         console.log(bytesRead)
//         console.log(buffer.toString())
//     })
// })
/**
 * 移动文件
 */
/**
 * 创建目录
 */
/**
 * 删除目录
 */

function getDirectory(){
    let currentPath=__dirname+"/a";
    let arr=[]
    function nextPath(currentPath){
        return new Promise((resolve,reject)=>
            fs.readdir(currentPath,(err,paths)=>{
                paths=paths.map((f)=>{
                    return path.join(currentPath,f)
                })
                if(paths.length===0){
                    arr.push(currentPath)
                    fs.rmdir(currentPath,(err)=>{
                        if(err){
                            reject()
                        }else{
                            resolve()
                        }
                    })
                }else{
                    Promise.all(paths.map((p)=>nextPath(p))).then((r)=>{
                        arr.push(currentPath)
                        fs.rmdir(currentPath,(err)=>{
                            if(err){
                                reject()
                            }else{
                                resolve()
                            }
                        })
                    }).catch(e=>{
                        reject();
                    })
                }
            })
        )
    }
    nextPath(currentPath).then(()=>{
        console.log(arr.toString())
    })
}
getDirectory()