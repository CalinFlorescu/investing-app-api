const express = require('express')
const { userController } = require('../controllers')
const handleAsync = require('../utils/handleAsync')

const { Api404Error } = require('../utils/errors')

const router = express.Router()

// router
//     .route('/user')
//     .post(userController.createUser)
//     .get(userController.getUsers)

router
    .route('/user')
    .get(userController.listUsers)
    // .patch(userController.updateUser)
    // .delete(userController.deleteUser)
    
module.exports = router
