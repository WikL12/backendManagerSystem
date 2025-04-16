import express, { Request, Response } from "express";
import { login } from "../controller/systemController";

const router = express.Router();
// 登录接口
router.post('/login', login)
// 登出接口
router.post('/logout', (req: Request, res: Response) => {
    res.json({ message: 'Logged out successfully' })
})
// 注册接口
router.post('/register', (req: Request, res: Response) => {
    res.json({ message: 'Logged out successfully' })
}) 

export default router;
