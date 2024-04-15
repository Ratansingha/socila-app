const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//Update a user
router.put("/:id",async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.user.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password,salt)
                } catch (error) {
                    return res.status(500).json(error)
                }
                try {
                    const user = await User.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    });
                    res.status(200).json("Account has been updated")
                } catch (error) {
                res.status(500).json(error)

                }
            }
            
        } else {
            res.status(403).json("you can update only your account")
        }
    } catch (error) {
 res.status(500).json(error)

    }
})

//Delete a user

router.delete("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            const user = await User.findByIdAndDelete(req.params.id);
            !user && res.status(404).json("user not found")
            res.status(200).json("Account has been deleted successfully");
        };
    } catch (error) {
        res.status(500).json(error);
    }
})
//Get all user

router.get("/", async (req, res) => {
    try {
        const user = await User.find(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get One User
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username }); 
    
        const { password, createdAt, ...other } = user._doc;
         res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error);
    }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePic } = friend;
            friendList.push({ _id, username, profilePic });
        })
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
});


//Follow a user

router.put("/:id/follow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);

                if (!user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followers: req.body.userId } });

                    await currentUser.updateOne({ $push: { following: req.params.id } });

                    res.status(200).json("user has been followed")
                } else {
                    res.status(403).json("you all ready follow this user");
                }
            } catch (error) {
                res.status(500).json(error);

            }
        } else {
            res.status(403).json("you can't follow yourself")
        }
    } catch (error) {
        res.status(500).json(error);

    }
});

//unFollow
router.put("/:id/unFollow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);

                if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followers: req.body.userId } });

                    await currentUser.updateOne({ $pull: { following: req.body.userId } });

                    res.status(200).json("user has been unFollowed")
                } else {
                    res.status(403).json("you all ready unFollow this user");
                }
            } catch (error) {
                res.status(500).json(error);

            }
        } else {
            res.status(403).json("you can't unFollow yourself")
        }
    } catch (error) {
        res.status(500).json(error);

    }
});



module.exports= router;