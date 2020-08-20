const express = require("express");
require("express-async-errors");
const handleErrors = require("./middlwares/error-handler");

// enviroment variables configuration

const {UPLOAD_FOLDER} = process.env;

// creating connection
require("./database/connection")();
const morgan = require("morgan");
const routers = require("./router/routers");

//creating Application
const application = express();

application.use(express.json());
application.use(morgan("dev"));

application.get("/", (req, res) => {
  res.json({messege: "Success"});
});

const APIRouter = express.Router();
APIRouter.get("", (req, res) => res.json({message: "Api is working.."}));
application.use("/api", APIRouter);

APIRouter.use("/users", routers.userRouter);
APIRouter.use("/products", routers.productRouter);
APIRouter.use("/orders", routers.orderRouter);
APIRouter.use("/categories", routers.categoryRouter);

APIRouter.get("/" + UPLOAD_FOLDER + "/*", (req, res, next) => {
  const path = req.url;
  const filePath = `${__dirname}${path}`;
  res.sendFile(filePath, (err) => {
    next();
  });
});

application.use(handleErrors);

console.log("Starting Application In Server.JS");

module.exports = {application};
