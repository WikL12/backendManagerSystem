import express, { Request, Response } from 'express'
import cors from 'cors'
import useRouter from './router/userRoute'
import systemRouter from './router/systemRoute'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const app = express();
// app.use(express.json({limit:'50mb'}));
// app.use(express.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use('/assets', express.static('assets'));
app.use('/user', useRouter)
app.use('/system', systemRouter)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
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

