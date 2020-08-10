const express = require('express')

const orderRouter = express.Router()


orderRouter.get('', (req, res) => {
    res.json({ message: 'Orders Working..' })
})



module.exports = { orderRouter }