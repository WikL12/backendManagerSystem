import { useEffect, useState} from "react";
import { getApi1 , getApi2 } from "../api/api1";
export default function Com() {
    useEffect(() => {
        // do something
       
    })
    const postApi = async()=>{
       try{
        const data = await getApi1();
        console.log(data);
       }catch(err){
        console.log('我是客户端调用时的错误:'+err);
       }
    }
    const postApi2 = ()=>{
        getApi2().then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log('我是客户端调用时的错误:'+err);
        });
    }
  return (
    <div>
      <h1>Com</h1>
      <p>Com page</p>
      <button onClick={postApi}>post api by async</button>
      <button onClick={postApi2}>post api by promise</button>
    </div>
  );
}