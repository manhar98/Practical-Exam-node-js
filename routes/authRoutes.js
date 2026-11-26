const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { optionalAuth } = require("../middleware/auth");

// Registration routes
router.get("/register", optionalAuth, authController.getRegister);
router.post("/register", authController.postRegister);

// Login routes
router.get("/login", optionalAuth, authController.getLogin);
router.post("/login", authController.postLogin);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
