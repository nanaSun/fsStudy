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
// console.log(Buffer.from({data:1}.toString()));
// fs.writeFile(path.join(__dirname,"1.txt"),'{data:1}',function(err){
//     console.log(err)
// })
// fs.appendFile(path.join(__dirname,"1.txt"),'{data:1}',function(err){
//     console.log(err)
// })
// let BUFFER_SIZE=5
// let readPos=0
// let writePos=0
// fs.open(path.join(__dirname,"1.txt"),"r",(err,rfd)=>{
//     let buf=Buffer.from("aaaaaaaa")
//     // buf 读取的位置
//     //6 读取多少
//     //0 从那个位置写入文件
//     fs.open(path.join(__dirname,"2.txt"),"w",(err,wfd)=>{
//         function next(){
//             let buf=Buffer.alloc(BUFFER_SIZE)
//             // buf 读取的位置
//             //6 读取多少
//             //0 从那个位置写入文件
//             fs.read(rfd,buf,0,BUFFER_SIZE,readPos,(err,byteRead)=>{
//                 console.log(byteRead)
//                 if(byteRead>0){
//                     readPos += byteRead
//                     fs.write(wfd,buf,0,byteRead,writePos,(err,byteRead)=>{
//                         console.log("success")
//                         writePos += byteRead
//                         next()
//                     })
//                 }else{  
//                     fs.fsync(wfd,()=>{
//                         fs.close(rfd,()=>{

//                         })
//                     })
//                 }
//             })
//         }
//         next()
//     })
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
//makeDirectory("a/a/f/c/s","")
function makeDirectory(makePaths,dir){
    let paths=makePaths.split("/")
    let newPaths=[];
    createDir()
    function createDir(){
        if(paths.length<=0) return;
        newPaths.push(paths.shift())
        let file=__dirname+"//"+newPaths.join("//")
        fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
            if (err) {
                if(err.code === 'ENOENT'){
                    fs.mkdir(file,()=>{
                        createDir()
                    })
                    console.log(`${file}`);
                }
                
            } else {
                console.log(`${file} exists, and it is writable`);
                createDir()
            }
        });
    }
   
}
fs.readdir(__dirname+"/a/a/f/c/",(err,files)=>{
    fs.readdir(__dirname+"/a/a/f/c/"+files[0],(err,files)=>{
        console.log(files)
    })
})
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