import express, { Request, Response } from 'express'
import cors from 'cors'
import useRouter from './router/userRoute'
import systemRouter from './router/systemRoute'
import todoRoute from './router/todoRoute'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressWs from 'express-ws'
import path from 'path'
const __dirname = path.resolve();
const app = express();
expressWs(app);
// app.use(express.json({limit:'50mb'}));
// app.use(express.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }))
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3100','http://localhost:3000'];
app.use(cors({
    origin: function (origin:any, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    credentials: true,
}))
app.use('/assets', express.static('assets'));
app.use('/user', useRouter)
app.use('/system', systemRouter)
app.use('/todo', todoRoute)

if(process.env.NODE_ENV === 'production'){
    console.log('now is production');
    app.use(express.static(path.join(__dirname,'../font-end/react-app','dist')));
    app.get(/(.*)/,(req,res)=>{
        res.sendFile(path.join(__dirname,'../font-end/react-app','dist','index.html'));
    });
}
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

