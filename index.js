const express = require("express");

// enviroment variables configuration
require("dotenv").config();
const {UPLOAD_FOLDER} = process.env;

// creating connection
require("./database/connection")();
const morgan = require("morgan");
const {userRouter} = require("./router/user-router");
const {productRouter} = require("./router/product-router");
const {orderRouter} = require("./router/order-router");
const {categoryRouter} = require("./router/category-router");
const handleErrors = require("./middlwares/error-handler");

const application = express();

application.use(express.json());
application.use(morgan("dev"));

application.listen(process.env.PORT || 3000, () => {
  console.log(`listening On Port ${process.env.PORT || 3000}`);
});

application.get("/", (req, res) => {
  res.json({messege: "Success"});
});

const APIRouter = express.Router();
APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
application.use("/api", APIRouter);

APIRouter.use("/users", userRouter);
APIRouter.use("/products", productRouter);
APIRouter.use("/orders", orderRouter);
APIRouter.use("/categories", categoryRouter);

APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
  const path = req.url;
  const filePath = `${__dirname}${path}`;
  res.sendFile(filePath, (err) => {
    next();
  });
});

application.use(handleErrors);
