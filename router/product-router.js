const express = require('express')

const productRouter = express.Router()

productRouter.get('', (req, res) => {
    res.json({ message: 'Product Api Is Working...' })
})


module.exports = { productRouter }