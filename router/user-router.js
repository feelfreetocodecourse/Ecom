const express = require("express");
const {
  getUsers,
  saveUser,
  loginUser,
  updateUser,
  updateUserById,
} = require("../controller/user-controller");
const {getOrderByUser} = require("../controller/order-controller");

const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlwares/user-auth-middleware");

const userRouter = express.Router();

// /api/users/
userRouter.get("/", adminAuthMiddleware, getUsers);

// /api/users/123/orders
userRouter.get("/:userId/orders", userAuthMiddleware, getOrderByUser);
userRouter.post("/", saveUser);

userRouter.put("/", userAuthMiddleware, updateUser);

//api/user/123
userRouter.put("/:user_id", adminAuthMiddleware, updateUserById);

userRouter.post("/login", loginUser);

module.exports = {userRouter};
