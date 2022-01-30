const Joi = require('@hapi/joi');
const { passwordValidator } = require('./custom.validator')

const register = Joi.object().keys({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .custom(passwordValidator)
        .required(),
    name: Joi.required()
        .required()
})

const login = Joi.object().keys({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .custom(passwordValidator)
        .required()
})

module.exports ={
    register,
    login
}