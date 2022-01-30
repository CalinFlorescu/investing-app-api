const userService = require('./user.service')
const bcrypt = require('bcrypt')
const { Api400Error } = require('../utils/errors')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const { 
    JWT_SECRET, 
    JWT_EXPIRATION 
} = require('../../config/config')

const encryptPassword = async (value) => {
    const salt = await bcrypt.genSalt(8)
    const token = await bcrypt.hash(value, salt)
    return token
}

const comparePasswords = async (password, token) => {
    const passwordMatches = await bcrypt.compare(password, token)
    if (!passwordMatches)
        throw new Api400Error(`Password doesn't match`)
}

const loginUser = async ({
    email,
    password
}) => {
    try {
        const user = await userService.getUserByEmail(email)
        await comparePasswords(password, user.token)
        return user
    } catch (error) {
        logger.error(error)
        throw new Api400Error('Emai or password not matching.')
    }
}

const generateAuthToken = async (userId, role) => {
    const token = jwt.sign({
        userId,
        role
    }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION
    })

    return token
}

module.exports = {
    loginUser,
    encryptPassword,
    generateAuthToken
}