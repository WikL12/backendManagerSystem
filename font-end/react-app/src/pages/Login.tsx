import {Button, Input, message} from "antd";
import {useState} from "react";
import { login } from "../api/system.api";
export default function Login() {
   const [password, setPassword] = useState<string|number>('')
   const [username, setUsername] = useState<string>('')

   const handleLogin = async () => {
       if (!username || !password) {
           message.error('请输入用户名和密码')
           return
       }
       const res = await login({username, password});
       console.log(res)
   }

  return (
    <div>
        <div className="w-3xl flex justify-center items-center h-screen">
            <div className="w-96 h-96 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col justify-center items-center h-full">
                    <span className="text-3xl font-bold">后台管理系统</span>
                    <span className="text-2xl font-bold">登录</span>
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-64 h-10 border-2 border-gray-300 rounded-lg mt-4" placeholder="请输入用户名" />
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-64 h-10 border-2 border-gray-300 rounded-lg mt-4" placeholder="请输入密码" />
                    <Button className="w-64 h-10 bg-blue-500 text-white rounded-lg mt-4" onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div>
    </div>
    
  )
}