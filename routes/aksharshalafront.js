const router = require("express").Router();
const AksharshalaFront = require("../models/AksharshalaFront");

router.post("/", async (req, res) => {
    const newTeam = new AksharshalaFront(req.body);
    try {
      const savedPost = await newTeam.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

// update team

router.put("/:id", async (req, res) => {
  try {
    const post = await AksharshalaFront.findById(req.params.id);
    if (post.username === req.body.username) {
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
router.delete("/:id", async (req, res) => {
  try {
    const post = await AksharshalaFront.findById(req.params.id);
    if (post.username === req.body.username) {
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
