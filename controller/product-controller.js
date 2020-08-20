const {Product} = require("../models/product");
const Joi = require("joi");
const {UPLOAD_FOLDER} = process.env;

async function getProducts(request, response, next) {
  const limit = Number.parseInt(request.query.pagesize) || 20;
  const page = Number.parseInt(request.query.page) || 1;
  const sort_by = request.query.sort;
  const skip = limit * (page - 1);

  const products = await Product.find().sort(sort_by).skip(skip).limit(limit);
  const count = await Product.countDocuments();
  response.json({products, count});
}

async function getProduct(request, response) {
  const _id = request.params.productId;
  const product = await Product.findOne({_id});
  response.json({product});
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

module.exports = {getProducts, createProduct, getProduct};
