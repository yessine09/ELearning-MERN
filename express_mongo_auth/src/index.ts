import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'

import { logger } from './config'
import configs from './config/configs'
import { NotFoundError } from './config/errors'
import error from './middleware/error'
import routes from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './config/swagger/swaggerConfig.json'
import { Server } from 'socket.io'

const passport = require('passport')
require('./config/passport.config')
const authPaasport = require('./routes/passport.route')
const app = express()

const session = require('express-session')
const crypto = require('crypto')

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex') // 32 bytes as a hexadecimal string
}

console.log('the secret Key! ', generateSecretKey())

const sessionSecret = process.env.SESSION_SECRET || generateSecretKey

//Middleware

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(express.json())
app.use(passport.session())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5171', // Spécifiez l'origine du frontend
    credentials: true, // Important si vous utilisez des cookies/session
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Les méthodes que vous voulez autoriser
    allowedHeaders: ['Content-Type', 'Authorization'], // Les en-têtes que vous voulez autoriser
  })
)

app.use('/auth', authPaasport)
app.use(helmet())
app.use(express.urlencoded({ limit: '50000mb', extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.forEach((route) => app.use(route))

app.use((req, res, next) => {
  next(new NotFoundError())
})

app.use(error)

mongoose
  .connect(configs.dbConnection)
  .then(() => {
    logger.info('connected to database successfully')

    //SOCKET.IO
    const server = app.listen(configs.port, () => {
      logger.info(`listening on http://localhost:${configs.port}`)
    })
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5171',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })

    // const io = new Server(server)
    io.use((socket, next) => {
      logger.info(`new client connected`, socket.client)
    })
    //END OF SOCKET IO
  })
  .catch((error) => console.error(error))

// const cookieSession = require("cookie-session");

// const isLoggedIn = (req: any, res: any, next: any) => {
//   req.user ? next() : res.sendStatus(401)
// }
// var authRouter = require('../src/routes/oauth')
// var requestRouter = require('../src/routes/request')

//app.use(session({ secret: 'cats' }))
// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

//app.use(passport.initialize())
// app.use('/oauth', authRouter)
// app.use('/request', requestRouter)

// app.use(passport.initialize())""
//app.use(passport.session())
// app.use('/', authGoogle)
