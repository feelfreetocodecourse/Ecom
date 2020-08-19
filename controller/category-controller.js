const {Category} = require("../models/category");
const Joi = require("joi");
const {Product} = require("../models/product");

async function getCategories(request, response) {
  const categories = await Category.find();
  response.json({categories});
}

async function getCategory(request, response) {
  const _id = request.params.categoryId;
  const category = await Category.findOne({_id});
  response.json({category});
}

async function createCategory(request, response, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  const validationResult = schema.validate(request.body);
  if (!validationResult.error) {
    const name = validationResult.value.name;
    const category = new Category({name});
    const result = await category.save();
    return response.json(result);
  }

  const erro = new Error(validationResult.error.details[0].message);
  return next(erro);
}

async function getProductsByCategory(request, response, next) {
  const products = await Product.find({
    category: request.params.categoryId,
  }).populate("category");
  response.json({products});
}

module.exports = {
  getCategories,
  createCategory,
  getCategory,
  getProductsByCategory,
};
