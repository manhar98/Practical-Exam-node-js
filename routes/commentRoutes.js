const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { verifyToken } = require("../middleware/auth");

// Delete comment (comment author or admin)
router.post("/:id/delete", verifyToken, commentController.postDeleteComment);

module.exports = router;
