const express = require('express')
const { getUsers } = require('../controller/user-controller')

const userRouter = express.Router()

// /api/users/
userRouter.get('', getUsers)


module.exports = { userRouter } 