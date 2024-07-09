import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).send(`Not a valid email format`);
  }

  try {
    const emailExist = await User.findOne({ email: email });

    if (emailExist) {
      return res.status(400).send(`Email already exists`);
    }

    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter all required fields");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json("Failed to login");
  }
};

export { register, login };
