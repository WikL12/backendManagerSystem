import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export const middlerware = async(req:Request, res: Response, next: NextFunction):Promise<any> => {
  try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:'未登录！'});
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
        localStorage.removeItem('token');
        res.cookie('jwt','',{httpOnly:true,maxAge:0});
        return res.status(402).json({message:'登录信息已过期！'});
    }
    console.log('jwt is not valid')
    next();
}catch(error){
    res.status(500).json({message:'network error'});
}
}