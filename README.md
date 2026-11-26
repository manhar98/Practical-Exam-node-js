# 📝 Blog Management System

A full-stack **Blog Management System** built using Node.js, Express.js, MongoDB, Mongoose, and EJS. This project allows multiple users to register, log in, create, manage, and view blog articles with secure JWT authentication and role-based access control.

## 🚀 Features

### 1. User Authentication
- User Registration and Login.
- Secure password hashing.
- JWT-based authentication.
- JWT token stored in HTTP cookies.
- User Logout functionality.
- Protected routes using authentication middleware.

### 2. Role-Based Access Control
- Two user roles: `Admin` and `User`.
- Role-based route protection.
- Admin and users have different access permissions.

### 3. Blog Management (CRUD)
- Create new blog articles.
- View all published articles.
- Update existing articles.
- Delete articles.
- View individual article details.

### 4. Multi-User Support
- Multiple users can register and log in.
- Each user can create their own articles.
- Users can view their own articles.
- User-specific article management.

### 5. MongoDB & Mongoose
- MongoDB database integration.
- User, Article, and Comment models.
- Mongoose schema relationships.
- Object referencing and Population.
- Fetch related user and article information.

### 6. EJS Views
- `articleList.ejs` – Display all articles.
- `myArticles.ejs` – Display logged-in user's articles.
- `articleForm.ejs` – Create and edit articles.
- `articleItem.ejs` – Display individual articles.
- `navbar.ejs` – Navigation bar.
- `login.ejs` – User login page.
- `register.ejs` – User registration page.

### 7. Stylish & Responsive UI
- Modern and attractive design.
- Custom CSS styling.
- Responsive layout for mobile, tablet, and desktop.
- Stylish navigation bar.
- User-friendly interface.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | Database Management |
| EJS | Template Engine |
| JWT | Authentication |
| Cookie-parser | Cookie Management |
| bcrypt / bcryptjs | Password Hashing |
| CSS3 | Styling |
| HTML5 | Page Structure |

## 📂 Project Structure

```text
BLOG-PROJECT/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── articleController.js
│   └── commentController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Article.js
│   └── Comment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── articleRoutes.js
│   └── commentRoutes.js
│
├── views/
│   ├── partials/
│   │   └── navbar.ejs
│   ├── articleList.ejs
│   ├── myArticles.ejs
│   ├── articleForm.ejs
│   ├── articleItem.ejs
│   ├── login.ejs
│   └── register.ejs
│
├── public/
│   └── css/
│       └── style.css
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## ⚙️ Installation & Setup

### Step 1: Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to Project

```bash
cd BLOG-PROJECT
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
JWT_SECRET=your_secret_key
```

### Step 5: Start MongoDB

Make sure your local MongoDB server is running.

### Step 6: Run Project

```bash
npm start
```

Or use:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

## 🔐 Authentication Flow

1. User registers with username and password.
2. Password is hashed before saving.
3. User logs in with valid credentials.
4. Server generates a JWT token.
5. JWT token is stored in an HTTP cookie.
6. Authentication middleware verifies the token.
7. Authorized users can access protected routes.
8. Logout clears the authentication cookie.

## 📌 Main Functionalities

- Register and Login.
- Logout securely.
- Create Blog Articles.
- Read All Articles.
- Update and Delete Articles.
- View My Articles.
- Admin and User Roles.
- JWT Authentication.
- Cookie-Based Session Handling.
- MongoDB Population.
- Multi-User Article Management.

## 🎯 Project Objective

The main objective of this project is to understand and implement practical backend development concepts using Node.js and Express.js, including authentication, authorization, CRUD operations, MongoDB relationships, middleware, and dynamic EJS rendering.

## 👨‍💻 Developer

**Manhar Zapadiya**

- GitHub: https://github.com/manhar98

---

⭐ If you like this project, don't forget to give it a star!
