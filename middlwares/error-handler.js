process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection ---------");
});

function handleErrors(error, request, response, next) {
  console.log(error);
  try {
    if (response.statusCode === 200) response.status(500);
    response.json({error: error.message || "something went Wrong"});
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = handleErrors;
