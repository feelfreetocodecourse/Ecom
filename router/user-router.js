const express = require("express");
const {
  getUsers,
  saveUser,
  loginUser,
  updateUser,
  updateUserById,
} = require("../controller/user-controller");
const {
  userAuthMiddleware,
  adminAuthMiddleware,
} = require("../middlwares/user-auth-middleware");

const userRouter = express.Router();

// /api/users/
userRouter.get("/", getUsers);
userRouter.post("/", saveUser);
userRouter.put("/", userAuthMiddleware, updateUser);

userRouter.put("/:user_id", adminAuthMiddleware, updateUserById);
userRouter.post("/login", loginUser);

module.exports = {userRouter};
