# 📝 Blogify

A full-stack blogging platform built with the **MERN stack**, featuring role-based access, Google authentication, rich content creation, and dynamic routing. Blogify empowers writers to share ideas and readers to explore curated content with ease.

---

## 📝 Table of Contents

- [📝 Blogify](#-blogify)
  - [📝 Table of Contents](#-table-of-contents)
  - [📖 About](#-about)
  - [🌍 Live Demo](#-live-demo)
  - [✨ Features](#-features)
    - [📝 Read Curated Content](#-read-curated-content)
    - [✍️ Create \& Manage Blogs](#️-create--manage-blogs)
    - [🔍 Smart Search \& Organized Categories](#-smart-search--organized-categories)
    - [👤 User Profiles](#-user-profiles)
    - [🔐 Google Login \& Route Protection](#-google-login--route-protection)
    - [🛡️ Role-Based Access Control](#️-role-based-access-control)
    - [📱 Responsive Design](#-responsive-design)
  - [🧩 Challenges \& Learnings](#-challenges--learnings)
    - [🔧 Challenges Faced](#-challenges-faced)
    - [📚 What I Learned](#-what-i-learned)
  - [🧰 Tech Stack](#-tech-stack)
    - [🚀 Frontend](#-frontend)
    - [🛠️ Backend](#️-backend)
    - [🗃️ Database](#️-database)
    - [🔐 Authentication](#-authentication)
    - [☁️ Cloud Storage](#️-cloud-storage)
    - [🌐 Deployment](#-deployment)
    - [🗂️ Version Control](#️-version-control)
  - [⚙️ Installation](#️-installation)
  - [🔐 Environment Variables](#-environment-variables)
  - [👤 Author](#-author)
  - [📃 License](#-license)

---

## 📖 About

**Blogify** is a full-stack blog platform designed for both creators and readers. Whether you're a tech enthusiast, a lifestyle writer, or someone who loves to explore new ideas, Blogify provides a seamless experience for writing, publishing, and discovering content.

This project was built with a focus on performance, user experience, and real-world functionality — featuring rich-text editing, image uploads, role-based access, secure Google authentication, and responsive design.

Blogify is more than just a blogging tool — it's a content-sharing ecosystem, crafted to help users express their thoughts and connect through words.

---

## 🌍 Live Demo

[🔗 Click here to try Blogify](https://blogify-aj.vercel.app)

---

## ✨ Features

### 📝 Read Curated Content

Explore a wide range of blogs across various categories — handpicked to match your interests.

### ✍️ Create & Manage Blogs

Write, edit, and delete your own blog posts using an intuitive rich-text editor (powered by CKEditor 5).

### 🔍 Smart Search & Organized Categories

Quickly find the content you care about with keyword-based search and neatly organized category filters.

### 👤 User Profiles

Each user has a profile where they can view their posts and track their activity on the platform.

### 🔐 Google Login & Route Protection

Secure and easy login using Google Sign-In. Certain routes and actions are protected and accessible only to authenticated users.

### 🛡️ Role-Based Access Control

Admins can manage users and categories, while writers can focus on creating and publishing content.

### 📱 Responsive Design

Fully responsive layout ensures a smooth experience across all devices — desktop, tablet, and mobile.

---

## 🧩 Challenges & Learnings

### 🔧 Challenges Faced

- **Rich Text Integration:**  
  Integrating CKEditor 5 with React required careful configuration to support media embeds, formatting, and dynamic content updates without breaking the state.

- **Role-Based Route Protection:**  
  Implementing admin vs. writer access needed precise control over frontend route guards and backend middleware to ensure proper permission handling.

- **Image Upload & Media Management:**  
  Handling blog images with Cloudinary while maintaining a smooth UX during upload, preview, and post-save stages was a key performance challenge.

- **SEO & Routing:**  
  Generating SEO-friendly dynamic routes for blog posts while keeping them indexed properly across reloads required URL structuring and slug generation logic.

- **Responsive Design Across Devices:**  
  Ensuring full functionality and visual consistency across mobile, tablet, and desktop devices using TailwindCSS took multiple test iterations.

---

### 📚 What I Learned

- Deepened my understanding of **React state management** using Redux in real-world content-driven applications.
- Improved my skills in **authentication flows** using Google Auth and **protecting routes** based on user roles.
- Gained hands-on experience integrating **rich-text editors** (CKEditor 5) and handling form data with images and text simultaneously.
- Learned to **secure API endpoints** effectively and structure a scalable backend using **Node.js** and **Express**.
- Understood the importance of **cloud storage solutions** like Cloudinary for modern web apps.
- Built and deployed a production-ready app using **Vercel**, with continuous deployment from GitHub.

---

## 🧰 Tech Stack

### 🚀 Frontend

- **React.js** – Component-based UI development
- **Tailwind CSS** – Utility-first responsive styling
- **Redux** – Global state management
- **Framer Motion** – Smooth animations and transitions

### 🛠️ Backend

- **Node.js** – JavaScript runtime for server-side logic
- **Express.js** – Lightweight web framework for API routing

### 🗃️ Database

- **MongoDB** – NoSQL database for storing users, blogs, and categories

### 🔐 Authentication

- **Google Authentication** – Secure login via Google Sign-In

### ☁️ Cloud Storage

- **Cloudinary** – Image and media management for blog content

### 🌐 Deployment

- **Vercel** – Hosting and continuous deployment for the frontend

### 🗂️ Version Control

- **GitHub** – Source control and collaborative development

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

## 👤 Author

**Ajith**
📎 [LinkedIn](www.linkedin.com/in/ajith11399)
📁 [Portfolio](https://ajith11399.vercel.app)

---

## 📃 License

Licensed under the [MIT License](LICENSE).
