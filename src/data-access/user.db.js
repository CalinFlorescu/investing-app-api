const { Api500Error } = require('../utils/errors')
const { User } = require('../models')


const findById = async ({ id: _id }) => {
    return await User.findById(id, (err, docs) => {
        if (err) 
            throw new Api500Error(`Error searching in db after id: ${err}`)
        return docs
    })
}

const findByEmail = async (email) => {
    return await User.findOne({email: email}, (err, users) => {
        if (err) 
            throw new Api500Error(`Error searching in db after email: ${err}`)
        
        return users
    }).clone()
}

const insertUser = async (userData) => {
    return User.create({ ...userData })
}

module.exports = {
    findById,
    findByEmail,
    insertUser
}