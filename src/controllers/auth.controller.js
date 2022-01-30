const { userService, authService } = require('../services')
const handleAsync = require('../utils/handleAsync')
const logger = require('../utils/logger')

const register = handleAsync(async (req, res, next) => {
    const {
        name, 
        email,
        role,
        password
    } = req.body
    const { salt, token } = await authService.encryptPassword(password)
    const user = await userService.createUser({
        name, 
        email,
        role, 
        token, 
        salt
    })

    logger.info(`User ${user.name} created!`)
    res.status(201).send(user)
}) 

const login = handleAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await authService.loginUser({ email, password })
    const token = await authService.generateAuthToken(user._id, user.role)

    res.status(200).send({
        token
    })
})

module.exports = {
    register,
    login
}