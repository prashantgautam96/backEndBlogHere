const router = require("express").Router();
const Blood = require("../models/Blood");

router.post("/", async (req, res) => {
    const newBlood = new Blood(req.body);
    try {
      const savedPost = await newBlood.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

// // update team

// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Team.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Team.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET team
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Team.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // delete team
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Team.findById(req.params.id);
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
      posts = await Blood.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
