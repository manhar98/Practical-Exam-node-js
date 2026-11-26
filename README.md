# 📝 Blog Management System

A dynamic and responsive Blog Management System developed using **Node.js, Express.js, MongoDB, Mongoose, and EJS**. This project supports multiple users, secure JWT authentication, cookie-based login, role-based access control, and complete blog article management.

## 🚀 Features

### 🔐 Authentication & Authorization
- User Registration and Login.
- JWT-based authentication.
- Secure password hashing.
- Cookie-based authentication.
- User Logout functionality.
- Protected routes using authentication middleware.
- Role-Based Access Control (Admin & User).

### 📝 Blog Management
- Create new blog articles.
- View all blog articles.
- Update existing articles.
- Delete articles.
- View individual article details.
- Manage personal articles.

### 👥 Multi-User Support
- Multiple users can register and log in.
- Each user can create their own articles.
- View user-specific articles.
- Article ownership management.

### 🗄️ Database Management
- MongoDB database integration.
- Mongoose models and schemas.
- User, Article, and Comment collections.
- MongoDB relationships using ObjectId references.
- Populate related user information.

### 🎨 User Interface
- EJS template engine.
- Stylish and responsive design.
- Custom CSS styling.
- Reusable Navbar partial.
- Login and Registration pages.
- Mobile-friendly layout.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | Database ODM |
| EJS | Template Engine |
| JWT | Authentication |
| Cookie-parser | Cookie Management |
| bcrypt / bcryptjs | Password Hashing |
| HTML5 | Page Structure |
| CSS3 | Styling |

## 📂 Project Structure

```text
Practical Exam/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── articleController.js
│   ├── authController.js
│   └── commentController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Article.js
│   ├── Comment.js
│   └── User.js
│
├── public/
│   └── css/
│       └── style.css
│
├── routes/
│   ├── articleRoutes.js
│   ├── authRoutes.js
│   ├── commentRoutes.js
│   └── userRoutes.js
│
├── views/
│   ├── articleForm.ejs
│   ├── articleItem.ejs
│   ├── articleList.ejs
│   ├── error.ejs
│   ├── login.ejs
│   ├── myArticles.ejs
│   ├── register.ejs
│   │
│   └── partials/
│       └── navbar.ejs
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open Project Folder

```bash
cd "Practical Exam"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root folder:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
JWT_SECRET=your_secret_key
```

### 5. Start MongoDB

Make sure your local MongoDB server is running.

### 6. Run the Project

```bash
npm start
```

Or, if you have configured Nodemon:

```bash
npm run dev
```

### 7. Open in Browser

```text
http://localhost:3000
```

## 🔑 Main Application Pages

| Page | Description |
|---|---|
| Register | Create a new account |
| Login | Login with username and password |
| Article List | View all blog articles |
| My Articles | View personal articles |
| Article Form | Create or edit articles |
| Article Item | View individual article |
| Navbar | Navigate through the application |
| Error Page | Display error messages |

## 🔒 Security Features

- Password hashing before database storage.
- JWT token verification.
- Cookie-based authentication.
- Authentication middleware.
- Protected application routes.
- Role-based authorization.

## 🎯 Project Objective

The main objective of this project is to understand practical backend development using Node.js and Express.js. It demonstrates authentication, authorization, CRUD operations, MongoDB relationships, middleware, EJS rendering, and multi-user functionality.

## 👨‍💻 Developer

**Manhar Zapadiya**

GitHub: https://github.com/manhar98/Practical-Exam-node-js.git

---

⭐ If you like this project, don't forget to give it a star!
