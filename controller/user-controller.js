const {User} = require("../models/user");
const Joi = require("joi");

function getUsers(request, response, next) {
  response.json({message: "Users Api Is Working.."});
}

async function saveUser(request, response, next) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    repassword: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(12),
  });

  const result = schema.validate(request.body);

  if (result.error) {
    // throw error
    response.status(400);
    return next(new Error(result.error.details[0].message));
  }

  const userData = result.value;

  if (userData.password != userData.repassword) {
    // throw errror
    response.status(400);
    return next(new Error("password not matched"));
  }

  // cheak user is unique
  let user = await User.findOne({email: userData.email});
  if (!user) {
    user = await new User(userData).save();
    response.json(user);
  } else {
    response.status(400);
    return next(new Error("Email already registered"));
  }
}

module.exports = {getUsers, saveUser};
