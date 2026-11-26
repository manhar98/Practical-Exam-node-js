const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { verifyToken } = require("../middleware/auth");

// My Articles — articles by the logged-in user
router.get("/my-articles", verifyToken, articleController.getMyArticles);

module.exports = router;
