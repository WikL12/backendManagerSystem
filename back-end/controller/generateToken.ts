import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
export  function generateToken(userid:string,res:any) {
    const token = jwt.sign({userid},process.env.JWT_SECRET!,{expiresIn:'30d'});
    res.cookie('jwt',token,{
     httpOnly:true,
     secure:false,
     maxAge:30*24*60*60*1000,
    });
    console.log(token)
    return token;
}