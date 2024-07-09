import bcrypt from "bcryptjs";
import User from "../models/User.js";

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
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
};

export { register };
