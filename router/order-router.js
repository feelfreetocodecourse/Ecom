const express = require("express");
const {getOrders, placeOrder} = require("../controller/order-controller");
const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlwares/user-auth-middleware");

const orderRouter = express.Router();

// /api/orders/
orderRouter.get("/", adminAuthMiddleware, getOrders);
orderRouter.post("/", userAuthMiddleware, placeOrder);

module.exports = {orderRouter};
