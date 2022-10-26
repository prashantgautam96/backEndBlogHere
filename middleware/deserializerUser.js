const { decode } = require("../utils/jwt.utils");

const deserializeUser = async (req, res, next) => {
  let token;

  if(req.headers.authorization){
     token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next();
  }
  const decoded = decode(token);

  if (decoded) {
    res.locals.user = decoded;
  }
  return next();
};

module.exports = { deserializeUser };
