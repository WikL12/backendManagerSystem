import { Request, Response } from "express";
export const login = (req:Request, res:Response) => {
    console.log(req.body)
    res.json({
        success: true,
        data: {
            token:'asdadadadadasdasdasdasdasd'
        }   
    }
    );
  }