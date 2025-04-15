import axios from "axios";
// 这个文件讨论的是使用两种不同的方式封装请求后，对于请求错误的处理
// 1. 使用try catch
// 如果在封装请求后，用户使用后任然想要自己处理错误信息，那么不论在try还是catch中，都需要使用Promise.reject抛出错误信息,错误信息会直接进入下一个方法的catch中
// 2. 使用axios的catch
// 如果在封装请求后，用户使用后任然想要自己处理错误信息，那么不论在then还是catch中，都需要使用reject()抛出错误信息,错误信息会直接进入下一个方法的catch中

export const getApi1 = async () => {
 try{
    const response = await fetch('http://localhost:3000/api2',{
        method:'POST',
    });
    const data = await response.json();
    if(data.success){
    return data;
    }else{
        return Promise.reject(data.message)
    }

 }catch(error){
    console.log('我是定义接口时的报错:'+error);
    return Promise.reject(error)
 }
}


export const getApi2 = ()=>{
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:3000/api2').then(res=>{
            if(res.data.success){
                resolve(res.data);
            }else{
                reject(res.data.message);
            }
        }).catch(err=>{
            console.log('我是定义接口时的报错:'+err);
            reject(err);
        })
    })
}