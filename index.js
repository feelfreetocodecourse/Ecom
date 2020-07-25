const express = require('express')
const morgan = require('morgan')
const application = express()

application.use(express.json())
application.use(morgan('dev'))

application.listen(3000, () => {
    console.log("listening On Port 3000");
})


application.get('/', (req, res) => {
    res.json({ 'messege': 'Success' })
})