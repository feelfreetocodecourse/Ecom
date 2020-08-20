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

async function getOrderByUser(request, response, next) {
  const user = request.params.userId;
  const orders = await Order.find({user}).populate("product");
  response.json({orders});
}

async function deleteOrder(request, response, next) {
  const _id = request.params.orderId;
  const result = await Order.deleteOne({_id});
  response.json({result});
}

async function updateOrder(request, response, next) {
  const _id = request.params.orderId;
  const body = request.body;

  const schema = Joi.object({
    product: Joi.string(),
    user: Joi.string(),
    address: Joi.string(),
    quantity: Joi.number().min(1),
    status: Joi.boolean(),
    payment_method: Joi.string(),
  });

  const {value, error} = schema.validate(body);

  if (error) {
    next(new Error(error.details[0].message));
    return;
  }

  if (value.product) {
    value.price = (await Product.findById(value.product)).price;
  }

  const result = await Order.findOneAndUpdate(
    {_id},
    {$set: value},
    {new: true}
  );
  response.json({result});
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

module.exports = {
  getOrders,
  placeOrder,
  getOrderByUser,
  deleteOrder,
  updateOrder,
};
