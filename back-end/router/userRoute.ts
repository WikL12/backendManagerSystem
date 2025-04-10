import express, { Request, Response } from 'express'
import { getUserList } from '../controller/userController'
import { middlerware } from '../middware/middleware'
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello Woasdadrld1')
})

router.get('/userList', middlerware,getUserList)


export default router