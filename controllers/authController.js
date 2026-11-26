const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../middleware/auth");

// GET /register
exports.getRegister = (req, res) => {
  res.render("register", { user: req.user || null, error: null });
};

// POST /register
exports.postRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("register", {
        user: null,
        error: "Username already exists!",
      });
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      role: role || "user",
    });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    res.render("register", {
      user: null,
      error: "Registration failed. Try again.",
    });
  }
};

// GET /login
exports.getLogin = (req, res) => {
  res.render("login", { user: req.user || null, error: null });
};

// POST /login
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        user: null,
        error: "Invalid username or password!",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("login", {
        user: null,
        error: "Invalid username or password!",
      });
    }

    // Create JWT token with user id and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect("/articles");
  } catch (err) {
    res.render("login", { user: null, error: "Login failed. Try again." });
  }
};

// GET /logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
