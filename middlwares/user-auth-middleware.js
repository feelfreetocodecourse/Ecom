const jwt = require("jsonwebtoken");

function userAuthMiddleware(request, response, next) {
  try {
    const bearenToken = request.headers.authorization;
    let token = null;
    token = bearenToken.split(" ")[1];
    const payload = jwt.verify(token, "1234");
    request.session = {
      user: payload,
    };

    next();
  } catch (error) {
    console.log(error);
    response.status(401);
    return response.json({error: "Invalid Token"});
  }
}

module.exports = {userAuthMiddleware};
