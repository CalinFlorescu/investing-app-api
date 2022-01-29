const getUsers =  (userDb) => {
    return async ({ userId } = {}) => {
        if (!userId)
            throw new Error('Please provide a user id.')

        try {
            const user = await userDb.findById(userId)
        } catch(error) {
            return error
        }
    }
}

module.exports = {
    getUsers
}