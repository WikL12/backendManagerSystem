import express, { Request, Response } from 'express'
import cors from 'cors'
import useRouter from './router/userRoute'
import systemRouter from './router/systemRoute'
const app = express();
app.use(cors())
app.use(express.json());


// app.post('/api1', (req:Request, res:Response) => {
//     // 解决跨域
//     res.header('Access-Control-Allow-Origin', '*');
//     res.json({ message: 'Hello World!',success  : false });
// });
// app.post('/api2', (req:Request, res:Response) => {
//     // 解决跨域
//     res.header('Access-Control-Allow-Origin', '*');
//     res.json({ message: 'Hello World!',success  : true });
// });

app.use('/user', useRouter)
app.use('/system', systemRouter)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})