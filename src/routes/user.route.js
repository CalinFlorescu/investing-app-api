const express = require('express')
const { userController } = require('../controllers')

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
