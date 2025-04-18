import {Button, Divider, Input, message} from "antd";
import {useState} from "react";
import { login } from "../api/system.api";
import {useNavigate} from "react-router";
// 用zustand管理token
import useSystemStore from "../store/system.store";

export default function Login() {
   const [password, setPassword] = useState<string|number>('')
   const [username, setUsername] = useState<string>('')
   const navigate = useNavigate();
   const {token, setToken} = useSystemStore()

   const handleLogin = async () => {
       if (!username || !password) {
           message.error('请输入用户名和密码')
           return
       }
       const res = await login({username, password});
       console.log(res)
       if(res.code == 200) {
        // localStorage.setItem('token', res.data.token)
        //    localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
        // 用zustand管理token
            setToken(res.data.token);
            message.success('登录成功')
            navigate('/userlist')
       }else{
           message.error(res.message)
       
       }
   }

  return (
    <div style={{width: '100vw', height: '100vh', background: 'url("http://localhost:3000/assets/bg.png") no-repeat center center fixed',backgroundSize: '100% 100%'}} className="flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center h-screen">
           <div className=" text-center text-white text-5xl font-bold mb-50">全栈后台管理框架(react+ts+antd+node+mysql)</div>
            <div className="w-96 h-96 bg-white rounded-lg shadow-lg relative -top-30">
                <div className="flex flex-col justify-evenly items-center h-full p-4 ">
                    <span className="text-2xl font-bold">登录</span>
                    <Divider className="m-0!"/>
                    <Input allowClear type="text" value={username} onChange={(e) => setUsername(e.target.value)} size="large" placeholder="请输入用户名" />
                    <Input allowClear type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="请输入密码" />
                    <Button className="w-full  bg-blue-500 text-white rounded-lg " size="large" type="primary" onClick={handleLogin}>Login</Button>
                    <Button className="w-full  bg-blue-500 text-white rounded-lg " size="large" type="dashed" onClick={()=>navigate('/register')}>Register</Button>
                </div>
            </div>
        </div>
    </div>
    
  )
}