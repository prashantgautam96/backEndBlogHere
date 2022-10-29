const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Event = require("../models/Events");
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

//CREATE EVENT
router.post("/", [requireUser, upload.single("photo")], async (req, res) => {
  const newEvent = new Event({
    ...req.body,
    username: res.locals.user.username,
    photo: req.file.filename,
  });
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", [requireUser], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.username === res.locals.user.username) {
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedEvent);
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

// //DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Event.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Event.find({ username });
    } else if (catName) {
      posts = await Event.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await EventCounts.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
