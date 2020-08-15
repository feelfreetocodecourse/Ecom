const express = require("express");
const {
  getUsers,
  saveUser,
  loginUser,
  updateUser,
} = require("../controller/user-controller");
const {userAuthMiddleware} = require("../middlwares/user-auth-middleware");

const userRouter = express.Router();

// /api/users/
userRouter.get("/", getUsers);
userRouter.post("/", saveUser);
userRouter.put("/", userAuthMiddleware, updateUser);
userRouter.post("/login", loginUser);

module.exports = {userRouter};
