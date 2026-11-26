const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const { verifyToken, optionalAuth, authorizeRoles } = require("../middleware/auth");

// Public routes (optional auth so navbar works)
router.get("/", optionalAuth, articleController.getAllArticles);

// Protected routes — require login
router.get("/new", verifyToken, articleController.getCreateArticle);
router.post("/", verifyToken, articleController.postCreateArticle);

// View single article (public)
router.get("/:id", optionalAuth, articleController.getArticleById);

// Edit article (author or admin)
router.get("/:id/edit", verifyToken, articleController.getEditArticle);
router.post("/:id/edit", verifyToken, articleController.postEditArticle);

// Delete article (author or admin)
router.post("/:id/delete", verifyToken, articleController.postDeleteArticle);

// Add comment (authenticated users)
router.post("/:id/comments", verifyToken, commentController.postAddComment);

module.exports = router;
