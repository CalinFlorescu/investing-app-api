const express = require('express')
const { authController } = require('../controllers')
const validator = require('../middlewares/validator')
const authValidator = require('../validators/auth.validator')

const router = express.Router()

router.post('/register', validator(authValidator.register), authController.register)
router.post('/login', validator(authValidator.login), authController.login)
router.post('/refresh-token', () => {
    // refresh token service logic
})
router.post('/forgot-password', () => {
    // forgot password service logic
})
router.post('/reset-password', () => {
    // reset password service logic
})

module.exports = router