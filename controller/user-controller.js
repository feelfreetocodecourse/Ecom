const {User} = require("../models/user");
const Joi = require("joi");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

async function getUsers(request, response, next) {
  const limit = Number.parseInt(request.query.pagesize) || 20;
  const page = Number.parseInt(request.query.page) || 1;
  const sort_by = request.query.sort;
  const skip = limit * (page - 1);

  const users = await User.find().sort(sort_by).skip(skip).limit(limit);
  const count = await User.countDocuments();

  response.json({users, count});
}

function validateUserForRegistation(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    repassword: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(12),
  });
  const result = schema.validate(user);
  return result;
}

function validateLoginCredentials(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });
  const result = schema.validate(body);
  return result;
}

async function saveUser(request, response, next) {
  const result = validateUserForRegistation(request.body);
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
  let isExists = await User.isExists(userData.email);

  if (!isExists) {
    userData.password = passwordHash.generate(userData.password);
    user = await new User(userData).save();
    response.json(user);
  } else {
    response.status(400);
    return next(new Error("Email already registered"));
  }
}

async function loginUser(request, response, next) {
  console.log(request.body);
  const result = validateLoginCredentials(request.body);
  if (result.error) {
    response.status(400);
    const err = new Error(result.error.details[0].message);
    return next(err);
  }

  const {email, password} = result.value;
  const user = await User.findOne({email});
  console.log("user", user);
  if (user) {
    // password cheak
    const isPasswordMatched = passwordHash.verify(password, user.password);
    if (isPasswordMatched) {
      // login success
      const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY);
      return response.json({message: "Login Success", token});
    }
  }

  response.status(400);
  const err = new Error("Email or password invalid");
  return next(err);
}

async function updateUser(request, response, next) {
  const loggedInUser = request.session.user;
  console.log("LOggedIn User", loggedInUser);

  const schema = Joi.object({
    phone: Joi.string().min(10).max(12),
    name: Joi.string().min(4).max(40),
  });

  const result = schema.validate(request.body);

  if (result.error) {
    return next(new Error(result.error.details[0].message));
  } else {
    let user = await User.findById(loggedInUser._id);
    user = Object.assign(user, result.value);
    user = await user.save();
    response.json(user);
  }
}
async function updateUserById(request, response, next) {
  const user_id = request.params.user_id;
  console.log("LOggedIn User", request.body);

  let user = await User.findById(user_id);
  user = Object.assign(user, request.body);
  user = await user.save();
  response.json(user);
}

module.exports = {getUsers, saveUser, loginUser, updateUser, updateUserById};
