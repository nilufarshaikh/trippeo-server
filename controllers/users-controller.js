import User from "../models/User.js";

const searchUser = async (req, res) => {
  const { query } = req.query;
  const loggedInUserId = req.user.id;

  try {
    if (!query) {
      return res.status(200).json({});
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUserId } },
        { username: new RegExp(query, "i") },
      ],
    }).select(
      "_id username email profilePicture bio location followers following"
    );

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const followUser = async (req, res) => {
  const followerId = req.user.id;
  const { followeeId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);

    if (!follower || !followee) {
      return res.status(404).json({ message: "User could not be found" });
    }

    if (follower.following.includes(followeeId)) {
      return res.status(400).json({ message: "Cannot follow user" });
    }

    follower.following.push(followeeId);
    followee.followers.push(followerId);

    await follower.save();
    await followee.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const { followeeId } = req.params;

  try {
    const follower = await User.findById(followerId);
    const followee = await User.findById(followeeId);

    if (!follower || !followee) {
      return res.status(404).json({ message: "User could not be found" });
    }

    if (!follower.following.includes(followeeId)) {
      return res.status(400).json({ message: "User is not being followed" });
    }

    follower.following = follower.following.filter(
      (id) => id.toString() !== followeeId.toString()
    );

    followee.followers = followee.followers.filter(
      (id) => id.toString() !== followerId.toString()
    );

    await follower.save();
    await followee.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { searchUser, followUser, unfollowUser };
