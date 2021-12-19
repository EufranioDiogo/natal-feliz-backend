const express = require('express');
const { authRouter } = require('./src/routes/auth/authRouter');
const { friendRouter } = require('./src/routes/friendHidden/friendRouter');
const { userRouter } = require('./src/routes/user/userRouter');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3002;

const cors = require("cors");
const { appRouter } = require('./src/routes/app/appRouter');
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