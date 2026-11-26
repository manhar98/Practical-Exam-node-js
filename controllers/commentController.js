const Comment = require("../models/Comment");
const Article = require("../models/Article");

// POST /articles/:id/comments — add a comment to an article
exports.postAddComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).render("error", {
        message: "Article not found.",
        user: req.user,
      });
    }

    const comment = new Comment({
      text,
      author: req.user._id,
      article: article._id,
    });
    await comment.save();

    // Push comment reference into article's comments array
    article.comments.push(comment._id);
    await article.save();

    res.redirect("/articles/" + article._id);
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to add comment.",
      user: req.user,
    });
  }
};

// POST /comments/:id/delete — delete a comment
exports.postDeleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).render("error", {
        message: "Comment not found.",
        user: req.user,
      });
    }

    // Only comment author or admin can delete
    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).render("error", {
        message: "You are not authorized to delete this comment.",
        user: req.user,
      });
    }

    // Remove comment reference from article
    await Article.findByIdAndUpdate(comment.article, {
      $pull: { comments: comment._id },
    });

    await Comment.findByIdAndDelete(comment._id);
    res.redirect("/articles/" + comment.article);
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to delete comment.",
      user: req.user,
    });
  }
};
