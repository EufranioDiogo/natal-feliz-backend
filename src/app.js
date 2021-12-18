//import { DB_PROD_URL, DB_DEV_URL } from './config/apiConfig';
const express = require('express');
const { authRouter } = require('./routes/auth/authRouter');
const { friendRouter } = require('./routes/friendHidden/friendRouter');
const { userRouter } = require('./routes/user/userRouter');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const port = 3000 || process.env.PORT;

const cors = require("cors");
const { appRouter } = require('./routes/app/appRouter');
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: "GET, PUT, POST"
}


dotenv.config()

app.use(cors(corsOptions))
app.use(express.json())




app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

// https://data.mongodb-api.com/app/data-ftwnh/endpoint/data/beta

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/friend', friendRouter)
app.use('/app', appRouter)

mongoose.connect(process.env.PROD_DB_URL, () => {
  console.log("Database connected!")

  app.listen(port, () => {
    console.log('Servidor rodando 1')
  });
})

