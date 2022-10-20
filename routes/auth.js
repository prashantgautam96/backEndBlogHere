const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { signJWT } = require("../utils/jwt.utils");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json({ ...user.toJSON(), password: null });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");
    console.log(user);
    !user.is_admin && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");
    console.log(validated);
    const { password, ...others } = user._doc;

    const jwt = signJWT(others);

    return res.status(200).json({ ...others, jwt });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

module.exports = router;
