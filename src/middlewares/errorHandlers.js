const { BaseError } = require('../utils/errors')

function logError (err) {
    console.error(err)
}

function logErrorMiddleware (err, req, res, next) {
    logError(err)
    next(err)
}

function returnErrorMiddleware (err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message)
}

function isOperationalError(error) {
    return error instanceof BaseError ? error.isOperational : false
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnErrorMiddleware,
    isOperationalError
}