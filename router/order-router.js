const express = require("express");
const {
  getOrders,
  placeOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/order-controller");
const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlwares/user-auth-middleware");

const orderRouter = express.Router();

// /api/orders/
orderRouter.get("/", adminAuthMiddleware, getOrders);
orderRouter.post("/", userAuthMiddleware, placeOrder);
orderRouter.delete("/:orderId", userAuthMiddleware, deleteOrder);
orderRouter.put("/:orderId", userAuthMiddleware, updateOrder);

module.exports = {orderRouter};
