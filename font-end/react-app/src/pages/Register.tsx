import { Button, Divider, Input ,message} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../api/system.api";
export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string|number>('');
    const handleRegister = async()=>{
        console.log(username,password);
        if(!username || !password) {
            message.error('请输入用户名和密码');
            return;
        }
        try{
            const res = await register({username, password});
            if(res.code == 200){
                message.success('注册成功');
                navigate('/login');
            } else{
                message.error(res.message);
                return Promise.reject(res.message);
            }
        }catch(e:any){
            message.error(e);
        }
        
    }
  return(
    <div style={{width: '100vw', height: '100vh', background: 'url("http://localhost:3000/assets/bg.png") no-repeat center center fixed',backgroundSize: '100% 100%'}} className="flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center h-screen">
           <div className=" text-center text-white text-5xl font-bold mb-50">账号注册</div>
            <div className="w-96 h-96 bg-white rounded-lg shadow-lg relative -top-30">
                <div className="flex flex-col justify-evenly items-center h-full p-4 ">
                    <span className="text-2xl font-bold">注册</span>
                    <Divider className="m-0!"/>
                    <Input allowClear type="text" value={username} onChange={(e) => setUsername(e.target.value)} size="large" placeholder="请输入用户名" />
                    <Input allowClear type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="请输入密码" />
                    <Button className="w-full  bg-blue-500 text-white rounded-lg " size="large" type="primary" onClick={handleRegister}>Register</Button>
                    <Button className="w-full  bg-blue-500 text-white rounded-lg " size="large" type="dashed" onClick={()=>navigate('/login')}>go to login</Button>
                </div>
            </div>
        </div>
    </div>
  )
}