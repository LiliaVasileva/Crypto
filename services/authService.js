const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");
const { SECRET } = require("../constants");

exports.findByUsername = (username) => User.findOne({ username });
exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {
  if (password !== repeatPassword) {
    throw new Error("Password mismatch!");
  }
  // TODO: Check if users exists;

  // const existingUser = await this.findByUsername(username);

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  //TODO: Validate password:

  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({ username, email, password: hashedPassword });
};

exports.login = async (email, password) => {
  // User exist
  const user = await this.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  // Password is valid

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }

  // Generate token
  const payload = {
    _id: user._id,
    email,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET);

  return token;
};
