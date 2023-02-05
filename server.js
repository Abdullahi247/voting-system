const express = require('express')
const app = express()

require("dotenv").config()

const db = require('./Database/database')
db()

const cookieParser = require('cookie-parser')

// app.use(cookieParser())
app.use(cookieParser(process.env.MYSECURESECRETKEY))

const helmet = require('helmet')
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false,
  directives: {
    "default-src": ["'self'"],
    "connect-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:"],
    "style-src-elem": ["'self'", "data:"],
    "script-src": ["'unsafe-inline'", "'self'"],
    "object-src": ["'none'"],
  },
}))

app.set("trust proxy", 1);
const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors(
  {
    origin: function (origin, callback) {
      callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // methods : '*',
    credentials: true,
    optionsSuccessStatus: 200
  }
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const Authentication = require('./Routers/Authentication')
app.use('/authentication', Authentication)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Voting System Development Mode in Progress on port ${PORT}`))
