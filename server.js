const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/articles", articleRoutes);
app.use("/comments", commentRoutes);

// Home redirect
app.get("/", (req, res) => {
  res.redirect("/articles");
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", {
    message: "Page not found!",
    user: null,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
