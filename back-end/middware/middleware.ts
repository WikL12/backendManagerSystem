import { NextFunction, Request, Response } from 'express'

export const middlerware = (req:Request, res: Response, next: NextFunction) => {
  // console.log(req.body);
  console.log(req,res)
  next();
}