const express = require("express");
var multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const {UPLOAD_FOLDER} = process.env;
const {
  getProducts,
  getProduct,
  createProduct,
} = require("../controller/product-controller");
const {adminAuthMiddleware} = require("../middlwares/user-auth-middleware");
const productRouter = express.Router();

// multer Configuration
const tempMulter = multer({dest: UPLOAD_FOLDER});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(__dirname, "../") + UPLOAD_FOLDER;

    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const fileName = mongoose.Types.ObjectId() + ".png";
    cb(null, fileName);
  },
});
const upload = multer({storage});

// /api/products/
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);
productRouter.post(
  "/",
  adminAuthMiddleware,
  upload.single("image"),
  createProduct
);

module.exports = {productRouter};
