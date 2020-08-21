const {logger} = require("../logger/logger");

process.on("uncaughtException", (err) => {
  logger.error(err.message, err);
});

process.on("unhandledRejection", (err) => {
  logger.error(err.message, err);
});

function handleErrors(error, request, response, next) {
  console.log(error);
  try {
    if (response.statusCode === 200) {
      logger.error(erorr.message, error);
      response.status(500);
    }
    response.json({error: error.message || "something went Wrong"});
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = handleErrors;
