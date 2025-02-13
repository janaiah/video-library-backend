const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model.js");
const register = async (req, res) => {
  const { UserId, UserName, Email, Password, Mobile } = req.body;
  const hashPassword = await bcrypt.hash(Password, 10);
  const newUser = new User({
    UserId,
    UserName,
    Email,
    Password: hashPassword,
    Mobile,
  });
  try {
    const checkUserId = await User.findOne({ UserId });
    if (checkUserId) {
      return res.status(400).json({ message: "User Id already exist" });
    }
    const savedUser = await newUser.save();
    if (!savedUser) {
      res.status(400).json({ message: "User registration failed" });
      res.end();
    }
    res
      .status(201)
      .json({ message: `User id ${UserId} registered successfully` });
    res.end();
  } catch (error) {
    res.status(500).json({ message: "User registration failed" });
    res.end();
  }
};
const login = async (req, res) => {
  const { UserId, Password } = req.body;

  console.log("UserId:", req.body.UserId);
  console.log("Password:", req.body.Password);
  try {
    //check if user exists
    const user = await User.findOne({ UserId });
    if (!user) {
      return res.status(404).json({ message: `User id ${UserId} not found` });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    //create token
    console.log(user.Role);
    let role = user.Role;
    const token = jwt.sign({ Role: role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log({ token });
    res.status(200).json({ token, role });
  } catch (error) {
    res.status(500).json({ message: "User login failed" });
    console.log(error);
    res.end();
  }
};

module.exports = { register, login };
