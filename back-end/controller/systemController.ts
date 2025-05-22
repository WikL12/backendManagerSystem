import { Request, Response } from "express";
import db from "../Database";
import {generateToken} from "./generateToken";
import fs from "fs";
import path from "path";
export const login = async(req:Request, res:Response) => {
    console.log(req.body)
    const { username, password } = req.body;
    const user = await db('user').select().where({userName:username});
    console.log(user)
    if (user.length === 0) {
       res.json({ message: '无此账号，请重试' ,code:300});
       return
    }
    // 生成token
    const token = generateToken(user[0].id,res);
    res.json({
        success: true,
        code:200,
        data: {
            token:token,
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


  export const sseControl = (req:Request, res:Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
    setInterval(() => {
      res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
    },10000)
  }



  // 小型文件上传
  export const uploadLittleFile = (req:any, res:Response) => {
    console.log(req.file)
    res.json({ message: '上传成功', code:200 })
  }
  // 切片文件上传
  export const uploadChunkFile = (req:any, res:Response) => {
    console.log(req.file)
    res.json({ message: '上传成功', code:200 })
  }
  // 切片文件合并
  export const mergeFile = (req:any, res:Response) => {
    const uploadPath = './uploads';
    const pdfPath = './pdf';
    
    // Ensure directories exist
    if (!fs.existsSync(path.join(process.cwd(), uploadPath))) {
        fs.mkdirSync(path.join(process.cwd(), uploadPath), { recursive: true });
    }
    if (!fs.existsSync(path.join(process.cwd(), pdfPath))) {
        fs.mkdirSync(path.join(process.cwd(), pdfPath), { recursive: true });
    }

    let files = fs.readdirSync(path.join(process.cwd(), uploadPath));
    // Fix sorting by converting to numbers
    files = files.sort((a,b) => {
        const numA = parseInt(a.split('-')[0]);
        const numB = parseInt(b.split('-')[0]);
        return numA - numB;
    });

    const writePath = path.join(process.cwd(), pdfPath, `${req.body.fileName}`);
    
    // Create a new file or truncate if it exists
    fs.writeFileSync(writePath, '');
    
    files.forEach((item) => {
        const chunkPath = path.join(process.cwd(), uploadPath, item);
        if (fs.existsSync(chunkPath)) {
          console.log(fs.readFileSync(chunkPath))
            fs.appendFileSync(writePath, fs.readFileSync(chunkPath));
            fs.unlinkSync(chunkPath);
        }
    });
    res.json({ message: '合并成功', code:200 });
  }
  // 文件下载
  export const downloadFile = (req:any, res:Response) => {
      const fileName = req.body.fileName;
      const filePath = path.join(process.cwd(), `./assets`, `${fileName}`);
      const content = fs.readFileSync(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.send(content);
  }