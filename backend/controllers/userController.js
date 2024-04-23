const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    req.session.user = { id: newUser._id, username: newUser.username }; // Store user info in session
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.user = { id: user._id, username: user.username }; // Store user info in session
    console.log("This is coming from the login route", req.session);
    res.json({
      message: "Logged in successfully",
      user: { id: user._id, username: user.username }, // Send user data to the client
    });
    console.log("INSIDE TRY: Session ID after setting user:", req.sessionID);
    console.log("INSIDE TRY: Cookie sent:", res.getHeader("Set-Cookie"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  console.log("END: Session ID after setting user:", req.sessionID);
  console.log("END: Cookie sent:", res.getHeader("Set-Cookie"));
});

// Logout route
router.post("/logout", (req, res) => {
  try {
    if (req.session.user) {
      // If user is logged in, destroy the session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("sessionID"); // Clear session cookie
        res.json({ message: "Logged out successfully" });
      });
    } else {
      res.status(401).json({ message: "You are not logged in" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
