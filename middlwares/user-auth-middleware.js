const jwt = require("jsonwebtoken");
const {JWT_KEY} = process.env;

function userAuthMiddleware(request, response, next) {
  try {
    const bearenToken = request.headers.authorization;
    let token = null;
    token = bearenToken.split(" ")[1];
    const payload = jwt.verify(token, JWT_KEY);
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

function adminAuthMiddleware(request, response, next) {
  try {
    const bearenToken = request.headers.authorization;
    let token = null;
    token = bearenToken.split(" ")[1];
    const payload = jwt.verify(token, JWT_KEY);
    request.session = {
      user: payload,
    };

    if (payload.isAdmin) {
      return next();
    }

    response.status(401);
    return response.json({error: "You are not authorized to access Resourse"});
  } catch (error) {
    console.log(error);
    response.status(401);
    return response.json({error: "Invalid Token"});
  }
}

module.exports = {userAuthMiddleware, adminAuthMiddleware};
