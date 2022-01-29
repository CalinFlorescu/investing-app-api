const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const express = require('express')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const { 
    logErrorMiddleware, 
    returnErrorMiddleware,
    isOperationalError,
    logError
 } = require('./middlewares/errorHandlers')

const {
    userRoutes
} = require('./routes')

dotenv.config()

const uri = 'mongodb+srv://agronum:OJ4KFJl9PJShSsC2@cluster1.wbe6o.mongodb.net/Investing-App?retryWrites=true&w=majority'

// mongoose.connect(uri, 
//     { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     });

// const mongoDbConnection = mongoose.connection

// mongoDbConnection.on('error', console.error.bind(console, "connection error: "))
// mongoDbConnection.on('open', () => {
//     logger.info('Connected to MongoDB cluster')
// })

const server = express()

server.use(bodyParser.json())
server.use(userRoutes)

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

server.listen(8080, (err) => {
    if (err) client.close()
    logger.info(`Server started on port ${8080}`)
})