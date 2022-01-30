const { Api400Error } = require('../utils/errors')
const userDb = require('../data-access/user.db')

const getUsers = async ({ userId } = {}) => {
    if (!userId)
        throw new Api400Error('Please provide a user id.')

    try {
        const user = await userDb.findById(userId)
    } catch(error) {
        return error
    }
}

const checkDuplicateEmail = async (email) => {
    const user = await userDb.findByEmail(email)
    if (user) {
        throw new Api400Error('Email already in use')
    }
}

const getUserByEmail = async (email) => {
    const user = await userDb.findByEmail(email)
    if (!user) {
        throw new Api400Error('User not found')
    }
    return user
}


const createUser = async (userData) => {
    checkDuplicateEmail(userData.email)
    const user = await userDb.insertUser(userData)
    const { email, name, role, portofolioId } = user
    return {
        email,
        name,
        role, 
        portofolioId
    }
}



module.exports = {
    getUsers,
    createUser,
    checkDuplicateEmail,
    getUserByEmail
}