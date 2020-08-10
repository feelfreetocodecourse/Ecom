const express = require('express')
const { getOrders } = require('../controller/order-controller')

const orderRouter = express.Router()

// /api/orders/
orderRouter.get('', getOrders)



module.exports = { orderRouter }