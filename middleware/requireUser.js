const requireUser = (req, res, next) => {
  if (!res.locals.user || !res.locals.user.is_admin) {
    return res.sendStatus(403);
  }
  return next();
};

module.exports = requireUser;
