const {Category} = require("../models/category");
const Joi = require("joi");

async function getCategories(request, response) {
  const categories = await Category.find();
  response.json({categories});
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

module.exports = {getCategories, createCategory};
