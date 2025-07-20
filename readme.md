# 📝 Blogify

A full-stack blogging platform built with the **MERN stack**, featuring role-based access, Google authentication, rich content creation, and dynamic routing. Blogify empowers writers to share ideas and readers to explore curated content with ease.

---

## 📝 Table of Contents

- [About](#about)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Challenges &amp; Learnings](#challenges--learnings)
- [Author](#author)
- [License](#license)

---

## 📖 About

A blogging platform that allows users to read, write, and manage blog content with role-based access, Google authentication, and responsive UI.

---

## 🌍 Live Demo

[🔗 Click here to try Blogify](https://blogify-aj.vercel.app)

---

## ✨ Features

- Google Sign-In & JWT Auth
- Admin & Writer Role Control
- Create, Edit, and Delete Blogs
- Category Filtering & Search
- Rich Text Editor (CKEditor 5)
- Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**: React.js, Tailwind CSS, Redux, Framer Motion
**Backend**: Node.js, Express.js, MongoDB, JWT
**Tools**: Google Auth, Cloudinary, Vercel, GitHub

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/Ajith-11399/YT-MERN-BLOGIFY.git
cd YT-MERN-BLOGIFY

# Install frontend
cd frontend
install node_modules => npm install
run frontend app => npm run dev

# Install backend
cd backend
install node_modules => npm install
run backend api => npm run server
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/server` directory:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## 🧠 Challenges & Learnings

- Built secure role-based access using JWT and middleware
- Protected dynamic React routes based on user roles
- Integrated Google Auth and handled token/session flows
- Worked with Cloudinary for media management

---

## 👤 Author

**Ajith**
📎 [LinkedIn](www.linkedin.com/in/ajith11399)
📁 [Portfolio](https://ajith11399.vercel.app)

---

## 📃 License

Licensed under the [MIT License](LICENSE).
