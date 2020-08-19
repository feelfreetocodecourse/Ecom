const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controller/category-controller");

const {adminAuthMiddleware} = require("../middlwares/user-auth-middleware");

const categoryRouter = express.Router();
// /api/categories/

categoryRouter.get("/", getCategories);
categoryRouter.post("/", adminAuthMiddleware, createCategory);

module.exports = {categoryRouter};
