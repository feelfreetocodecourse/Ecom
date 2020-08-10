const express = require('express')
const { getProducts } = require('../controller/product-controller')

const productRouter = express.Router()

// /api/products/
productRouter.get('', getProducts)


module.exports = { productRouter }