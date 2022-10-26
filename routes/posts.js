const path = require("path");
const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const requireUser = require("../middleware/requireUser");
const multer = require("multer");

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

//CREATE POST
router.post("/", [requireUser, upload.single("photo")], async (req, res) => {
  const newPost = new Post({
    ...req.body,
    author: res.locals.user.username,
    photo: req.file.filename,
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE POST NOW
router.put("/:id", [requireUser, upload.single("photo")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === res.locals.User.username) {
      try {
        let updatedPost;
        if (req.file) {
          updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: { ...req.body, photo: req.file.filename },
            },
            { new: true }
          );
        } else {
          updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
        }
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

//DELETE POST
router.delete("/:id", [requireUser], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
