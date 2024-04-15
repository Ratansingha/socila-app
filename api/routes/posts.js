const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();

//Create a post
router.post("/", async (req, res) => {
    try {

        const newPost = await new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (error) {
        res.status(500).json(error)
    }
});

//Update Post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }

    } catch (error) {
        res.status(500).json(error)
    };
});



//Delete Post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (error) {
        res.status(500).json(error)
    };
});

//Like A Post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("post has been liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.useId } });
            res.status(200).json("post has been dislikes")
        };
    } catch (error) {
        res.status(500).json(error)
    };
});

//Get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
});


//Get timeLine posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPost));
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get users all posts
router.get("/profile/:username", async (req, res) => {
    try {
          const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;