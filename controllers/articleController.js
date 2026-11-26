const Article = require("../models/Article");
const Comment = require("../models/Comment");
const User = require("../models/User");

// GET /articles — list all articles (with author populated)
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.render("articleList", { articles, user: req.user || null });
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to fetch articles.",
      user: req.user || null,
    });
  }
};

// GET /my-articles — articles written by logged-in user
exports.getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.render("myArticles", { articles, user: req.user });
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to fetch your articles.",
      user: req.user,
    });
  }
};

// GET /articles/new — show create article form
exports.getCreateArticle = (req, res) => {
  res.render("articleForm", { article: null, user: req.user });
};

// POST /articles — create a new article
exports.postCreateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Article({
      title,
      content,
      author: req.user._id,
    });
    await article.save();

    // Also push article reference to user's articles array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { articles: article._id },
    });

    res.redirect("/articles");
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to create article.",
      user: req.user,
    });
  }
};

// GET /articles/:id — view a single article with comments (populated)
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      });
    if (!article) {
      return res.status(404).render("error", {
        message: "Article not found.",
        user: req.user || null,
      });
    }
    res.render("articleItem", { article, user: req.user || null });
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to fetch article.",
      user: req.user || null,
    });
  }
};

// GET /articles/:id/edit — show edit form
exports.getEditArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).render("error", {
        message: "Article not found.",
        user: req.user,
      });
    }

    // Only author or admin can edit
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).render("error", {
        message: "You are not authorized to edit this article.",
        user: req.user,
      });
    }

    res.render("articleForm", { article, user: req.user });
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to load edit form.",
      user: req.user,
    });
  }
};

// POST /articles/:id/edit — update an article
exports.postEditArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).render("error", {
        message: "Article not found.",
        user: req.user,
      });
    }

    // Only author or admin can edit
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).render("error", {
        message: "You are not authorized to edit this article.",
        user: req.user,
      });
    }

    article.title = req.body.title;
    article.content = req.body.content;
    await article.save();

    res.redirect("/articles/" + article._id);
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to update article.",
      user: req.user,
    });
  }
};

// POST /articles/:id/delete — delete an article
exports.postDeleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).render("error", {
        message: "Article not found.",
        user: req.user,
      });
    }

    // Only author or admin can delete
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).render("error", {
        message: "You are not authorized to delete this article.",
        user: req.user,
      });
    }

    // Remove comments associated with this article
    await Comment.deleteMany({ article: article._id });

    // Remove article reference from user
    await User.findByIdAndUpdate(article.author, {
      $pull: { articles: article._id },
    });

    await Article.findByIdAndDelete(article._id);
    res.redirect("/articles");
  } catch (err) {
    res.status(500).render("error", {
      message: "Failed to delete article.",
      user: req.user,
    });
  }
};
