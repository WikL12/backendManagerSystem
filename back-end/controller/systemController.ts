import { Request, Response } from "express";
export const login = (req:Request, res:Response) => {
    console.log(req.body)
    res.json({
        success: true,
        code:200,
        data: {
            token:'asdadadadadasdasdasdasdasd'
        }   
    }
    );
  }

  export const logout = (req:Request, res:Response) => {
    res.json({ message: 'Logged out successfully',code:200 })
  }

  export const register = (req:Request, res:Response) => {
      res.json({ message: 'register out successfully', code:200 })
  }
