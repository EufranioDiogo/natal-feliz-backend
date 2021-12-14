import express from 'express';
import { authRouter } from './routes/auth/authRouter';
import { friendRouter } from './routes/friendHidden/friendRouter'
import { userRouter } from './routes/user/userRouter';
import dotenv from 'dotenv';
import { Mongoose } from 'mongoose';
import { Console } from 'console';


const app = express();
const port = 3000;
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


console.log(process.env.DEV_DB_URL)

mongoose.connect(process.env.DEV_DB_URL || '', () => {
  app.listen(port, () => {
    console.log('Servidor rodando')
  });
})

