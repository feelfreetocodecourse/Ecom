const Joi = require("joi");
const {Order} = require("../models/order");
const {Product} = require("../models/product");

async function getOrders(request, response) {
  //   const orders = await Order.find().populate("user product");
  const orders = await Order.find().populate([
    {
      path: "product",
      populate: "category",
    },
    {path: "user", select: "-password"},
  ]);
  response.json({orders});
}

async function placeOrder(request, response, next) {
  const schema = Joi.object({
    orders: Joi.array()
      .items({
        product: Joi.string().required(),
        user: Joi.string().required(),
        address: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
      .min(1)
      .required(),
  });

  const validationResult = schema.validate(request.body);
  if (validationResult.error) {
    return next(new Error(validationResult.error.details[0].message));
  }
  const {orders} = validationResult.value;

  for (index in orders) {
    let order = orders[index];
    let productId = order.product;
    let price = (await Product.findOne({_id: productId})).price;
    orders[index].price = price;
  }
  const saveResult = await Order.create(orders);
  response.json({orders: saveResult});
}

module.exports = {getOrders, placeOrder};
