const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const logger = require('./utils/logger')
const dbConnect = require('../config/db')

const { 
    logErrorMiddleware, 
    returnErrorMiddleware,
    isOperationalError,
    logError
 } = require('./middlewares/errorHandlers')

const {
    userRoutes,
    authRoutes
} = require('./routes')

dotenv.config()
dbConnect()

const server = express()

server.use(bodyParser.json())
server.use(userRoutes)
server.use(authRoutes)

server.use(logErrorMiddleware)
server.use(returnErrorMiddleware)

// Catch All Uncaught Exceptions
process.on('uncaughtException', error => {
    logError(error)

    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

// Catch All Unhandled Promise Rejections
process.on('unhandledRejection', error => {
    throw error
})

server.listen(process.env.PORT, (err) => {
    if (err) client.close()
    logger.info(`Server started on port ${process.env.PORT}`)
})