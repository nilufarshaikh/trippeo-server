import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter the required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email" });
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "The provided email already exists" });
    }

    const response = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    });

    res.status(201).json({ success: true, data: { id: response._id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating account" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all required fields" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

const profile = async (req, res) => {
  try {
    const response = await User.findById(req.user.id);

    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const user = {
      id: response._id,
      username: response.username,
      email: response.email,
      profile_picture: response.profile_picture,
      followers: response.followers,
      following: response.following,
    };

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user profile" });
  }
};

export { register, login, profile };
