import express, { Request, Response } from "express";
import { login , logout,register ,sseControl} from "../controller/systemController";

const router = express.Router();
// 登录接口
router.post('/login', login)
// 登出接口
router.post('/logout', logout)
// 注册接口
router.post('/register', register) 

router.get('/sse',sseControl)

export default router;
