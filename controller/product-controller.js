function getProducts(request, response) {
    response.json({ message: 'Products Api Is Working..' })
}


module.exports = { getProducts }