const BaseError = require('../utils/errors')
const { httpStatusCodes } = require('../constants')
const { User } = require('../models')


const findById = async ({ id: _id }) => {
    return await User.findById(id, (err, docs) => {
        if (err) 
            throw new BaseError(httpStatusCodes.INTERNAL_SERVER, `Error searching in db: ${err}`)
        return docs
    })
}

module.exports = {
    findById
}