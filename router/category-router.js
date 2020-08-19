const express = require("express");
const {
  getCategories,
  createCategory,
  getCategory,
  getProductsByCategory,
} = require("../controller/category-controller");

const {adminAuthMiddleware} = require("../middlwares/user-auth-middleware");

const categoryRouter = express.Router();
// /api/categories/

categoryRouter.get("/", getCategories);
categoryRouter.get("/:categoryId", getCategory);
categoryRouter.get("/:categoryId/products", getProductsByCategory);
categoryRouter.post("/", adminAuthMiddleware, createCategory);

module.exports = {categoryRouter};
