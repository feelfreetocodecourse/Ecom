const {Product} = require("../models/product");
const Joi = require("joi");
const {UPLOAD_FOLDER} = require("../constants");

async function getProducts(request, response) {
  const products = await Product.find();

  response.json({products});
}

function validateProduct(data) {
  // name , price , discount, productImage , category , active
  const productSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    price: Joi.number().min(1).required(),
    discount: Joi.number(),
    category: Joi.string().required(),
    active: Joi.boolean(),
  });

  const result = productSchema.validate(data);
  return result;
}

async function createProduct(request, response, next) {
  // create
  console.log(request.file);

  const productImage = UPLOAD_FOLDER + "/" + request.file.filename;

  const validationResult = validateProduct(request.body);
  if (validationResult.error) {
    return next(new Error(validationResult.error.details[0].message));
  }

  let product = new Product({
    ...validationResult.value,
    productImage,
  });

  product = await product.save();
  // console.log(request.bodyro);
  response.json({product});
}

module.exports = {getProducts, createProduct};
