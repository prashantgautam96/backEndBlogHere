const jwt = require("jsonwebtoken");

const signJWT = (object) => {
  const PRIVATE_KEY = process.env.JWT_SECRET;
  return jwt.sign(object, PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES || "2h",
  });
};

const decode = (token) => {
  try {
    const PRIVATE_KEY = process.env.JWT_SECRET;
    const decoded = jwt.decode(token, PRIVATE_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { signJWT, decode };
