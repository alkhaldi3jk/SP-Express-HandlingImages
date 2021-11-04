const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys= require("../../config/keys")

exports.signup = async (req, res, next) => {
  try {
    const saltRouunds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRouunds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + keys.JWT_EXPIRATION_MS,
    };
    // const token = jwt.sign(payload, keys.JWT_SECRET);
    res.status(201).json({ token: token });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }

};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + keys.JWT_EXPIRATION_MS, // the token will expire after 15 minutes
  };
  const token = jwt.sign(payload, keys.JWT_SECRET);
  return token;
};