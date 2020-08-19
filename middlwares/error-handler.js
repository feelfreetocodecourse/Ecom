function handleErrors(error, request, response, next) {
  console.log(error);
  try {
    if (response.statusCode === 200) response.status(500);
    response.json({error: error.message});
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = handleErrors;
