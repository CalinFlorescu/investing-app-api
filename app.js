const dotenv = require('dotenv')
const express = require('express')

dotenv.config()

const initRoutes = require('./api-routes')

const app = express()

const server = initRoutes(app)

server.listen(8080, () => {
    console.log(`Server started on port ${8080}`)
})