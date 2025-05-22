import express, { Request, Response } from "express";
import { login , logout,register ,sseControl,uploadLittleFile,uploadChunkFile,mergeFile,downloadFile} from "../controller/systemController";
import expressWs from "express-ws";
import multer from "multer"
const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.index}-${req.body.fileName}`)
    }
})
const uploadChunk = multer({ storage: storage })
const router = express.Router();
expressWs(router);
// 登录接口
router.post('/login', login)
// 登出接口
router.post('/logout', logout)
// 注册接口
router.post('/register', register) 

router.get('/sse',sseControl)

router.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send('hello world')
    })
})

router.ws('/chatRoom', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg)
        ws.send(msg)
    })
})

router.post('/uploadLittleFile',upload.single('file')  ,uploadLittleFile)

router.post('/uploadChunkFile',uploadChunk.single('file')  ,uploadChunkFile)
// 将文件合并
router.post('/mergeFile', mergeFile)
// 文件流式下载
router.post('/downloadFile', downloadFile)

export default router;
