const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "blog_jwt_secret_key_2024";

// Verify JWT token from cookie
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

// Optional auth — attach user if token exists, but don't block
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) req.user = user;
    }
  } catch (_) {
    // ignore invalid token
  }
  next();
};

// Role-based access control middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).render("error", {
        message: "Access Denied: You do not have permission.",
        user: req.user || null,
      });
    }
    next();
  };
};

module.exports = { verifyToken, optionalAuth, authorizeRoles, JWT_SECRET };
