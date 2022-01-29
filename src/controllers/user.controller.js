const handleAsync = require('../utils/handleAsync')
const { userServices } = require('../services')
const logger = require('../utils/logger')

const listUsers = handleAsync(async (req, res) => {
    const result = await userServices.getUsers()
    res.send(result)
})

module.exports = {
    listUsers
}
 