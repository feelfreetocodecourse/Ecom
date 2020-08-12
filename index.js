const express = require("express");
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

application.listen(3000, () => {
  console.log("listening On Port 3000");
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

application.use(handleErrors);
