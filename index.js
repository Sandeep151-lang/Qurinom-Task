const express = require('express')
const app = express()
const cors = require('express')
const env = require('dotenv')
const bodyparser = require('body-parser')
const user = require('./controller/user')

env.config()

require('./dbConn/db')
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  };
  app.use(cors(corsOptions));
  app.options('*',cors())

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyparser.json())




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
  })

app.use('/user',user)

const port =  process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})


module.exports = app