const express = require("express");
require("express-async-errors");
const handleErrors = require("./middlwares/error-handler");
const helmet = require("helmet");
const cors = require("cors");

// enviroment variables configuration

const {UPLOAD_FOLDER} = process.env;

// creating connection
require("./database/connection")();
const morgan = require("morgan");
const routers = require("./router/routers");

//creating Application
const application = express();

// application.use(helmet());
var corsOptions = {
  origin: "localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// application.use(cors(corsOptions));
application.use(cors());

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
module.exports = {application};
