const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    //set cookie
    res.json({ token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get user details

exports.getUser = async (req, res) => {
  // The user should already be attached to req by the authMiddleware
  const userId = req.user._id; // Use _id from the user object attached by middleware

  try {
 
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user); // Return the user details
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
};
