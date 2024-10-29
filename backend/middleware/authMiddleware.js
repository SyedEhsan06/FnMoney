const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by id and attach to request
    const user = await User.findById(decoded.id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user; // Attach user info to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
