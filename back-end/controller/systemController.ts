import { Request, Response } from "express";
import db from "../Database";
export const login = async(req:Request, res:Response) => {
    console.log(req.body)
    const { username, password } = req.body;
    const user = await db('user').select().where({userName:username});
    console.log(user)
    if (user.length === 0) {
       res.json({ message: '无此账号，请重试' ,code:300});
       return
    }
    res.json({
        success: true,
        code:200,
        data: {
            token:'asdadadadadasdasdasdasdasd',
            username: user[0].userName,
            password: user[0].passWord,
        }   
    }
    );
  }

  export const logout = (req:Request, res:Response) => {
    res.json({ message: 'Logged out successfully',code:200 })
  }

  export const register = async(req:Request, res:Response) => {
    console.log(req.body)
        const userData = await db('user').select();
        console.log(userData)
        userData.forEach((item)=>{
            if(item.userName === req.body.username){
                console.log(item)
                res.json({ message: '该账号已经注册过，请您重新注册', code:300 })
                return
            }
        })
        const result = await db('user').insert({
            userName: req.body.username,
            passWord: req.body.password,
        })
        console.log(result)
        if(result){
            res.json({ message: 'register in successfully', code:200})
        }else{
            res.json({ message: '注册失败！', code:300 })
        }
      
  }
