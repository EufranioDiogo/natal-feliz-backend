import { DB_PROD_URL, DB_DEV_URL } from './config/apiConfig';
import express from 'express';
import { authRouter } from './routes/auth/authRouter';
import { friendRouter } from './routes/friendHidden/friendRouter'
import { userRouter } from './routes/user/userRouter';
import dotenv from 'dotenv';
import { Mongoose } from 'mongoose';
import { Console } from 'console';


const app = express();
const port = 3000 || process.env.PORT;
const mongoose = new Mongoose();

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


dotenv.config()

app.use(cors(corsOptions))
app.use(express.json())




app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/friend', friendRouter)

console.log(DB_PROD_URL)

mongoose.connect(DB_DEV_URL, (error: any) => {
  console.log(error)
  app.listen(port, () => {
    console.log('Servidor rodando 1')
  });
})

