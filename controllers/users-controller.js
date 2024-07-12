import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import validator from "validator";

const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please enter the required fields",
    });
  }

  if (username.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Name must not exceed 50 characters",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "The provided email already exists",
      });
    }

    const response = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    });

    res.status(201).json({
      success: true,
      data: { id: response._id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating user account",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter the required fields",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      token: token,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await User.findById(userId)
      .populate("travelStories")
      .exec();

    if (!response) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const user = {
      id: response._id,
      username: response.username,
      email: response.email,
      bio: response.bio,
      location: response.location,
      profilePicture: response.profilePicture,
      followers: response.followers.length,
      following: response.following.length,
      travelStories: response.travelStories,
      travelStoriesCount: response.travelStories.length,
    };

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

const searchUser = async (req, res) => {
  const { query } = req.query;
  const loggedInUserId = req.user.id;

  try {
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: loggedInUserId } },
        {
          $or: [
            { username: new RegExp(query, "i") },
            { email: new RegExp(query, "i") },
          ],
        },
      ],
    }).select(
      "_id username email profilePicture bio location followers following"
    );

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { register, login, profile, searchUser };
