const express = require('express')
//const cors = require("cors");
const rateLimit = require("express-rate-limit");

require('dotenv').config();

const app = express()

app.enable("trust proxy");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000 // 100 calls for each IP is maximum
});

app.use(limiter);


/*
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  methods: "GET"
}
*/

//app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

/*
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", req.get('origin'));
  res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization")
  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return res.status(200).json({

    })
  }
  next()
});
*/
/*
app.use((req, res, next) => {
  console.log(req.headers.origin)
  if (req.headers.origin === null || req.headers.origin === "" || req.headers.origin === undefined) {
    const error = new Error("No origin specified")
    error.status = 500
    next(error)
  }
  else {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization")
    res.header("Content-Type", "application/json")
    res.header("Vary", "Origin")
    if (req.method === "OPTIONS") {
      
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      return res.status(200).json({

      })
    }
    next()
  }
});
*/

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization")
    res.header("Content-Type", "application/json")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Vary", "Origin")

      if (req.headers.origin === null || req.headers.origin === "" || req.headers.origin === undefined) {
        const error = new Error("No origin specified")
        error.status = 500
        next(error)
      }
      return res.status(200).json({

      })
    }
    next()
});


app.use('/api/comments', require('./routes/api/comments'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/confirmation', require('./routes/api/confirmation'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/bezwaar', require('./routes/api/bezwaar'));

app.get('/api', (req, res) => {
  res.json("Welcome to the API!!");
});

app.use((req, res, next) => {
  const error = new Error("Route not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    msg: error.message
  })
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`))