const router = require("express").Router();
const AksharshalaFront = require("../models/AksharshalaFront");
const requireUser = require("../middleware/requireUser");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images/user"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", [requireUser, upload.single("photo")], async (req, res) => {
  console.log(req.body);
  const newTeam = new AksharshalaFront({
    ...req.body,
    featured: false,
    author: res.locals.user.username,
    photo: req.file.filename,
  });
  try {
    const savedPost = await newTeam.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// update team

router.put("/:id", [requireUser], async (req, res) => {
  try {
    const post = await AksharshalaFront.findById(req.params.id);
    if (post.username === res.locals.user.username) {
      try {
        const updatedPost = await AksharshalaFront.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET team
router.get("/:id", async (req, res) => {
  try {
    const post = await AksharshalaFront.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete team
router.delete("/:id", [requireUser], async (req, res) => {
  try {
    const post = await AksharshalaFront.findById(req.params.id);
    if (post.username === res.locals.user.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all team members
//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await newTeam.find({ username });
    } else if (catName) {
      posts = await Team.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await AksharshalaFront.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
