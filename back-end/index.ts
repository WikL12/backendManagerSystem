import express, { Request, Response } from 'express'

import useRouter from './router/userRoute'
const app = express();
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

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})