const { httpStatus } = require('../constants')

class BaseError extends Error {
    constructor (name, statusCode, isOperational, description) {
        super(description)
       
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

class Api404Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatus.NOT_FOUND,
        isOperational = true,
        description = 'Resource not found.'
    ) {
        super(name, statusCode, isOperational, description)
    }
}

class Api400Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatus.BAD_REQUEST,
        isOperational = true,
        description = 'Bad request'
    ) {
        super(name, statusCode, isOperational, description)
    }
}

class Api500Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatus.INTERNAL_SERVER,
        isOperational = true,
        description = 'Server related issue'
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = {
    Api404Error,
    Api400Error,
    Api500Error,
    BaseError
}