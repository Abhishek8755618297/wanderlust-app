# 🌍 Wanderlust – Full-Stack Web Application (In Progress)

Wanderlust is a **travel accommodation web application** where users can view, add, edit, and delete listings of beautiful travel stays.  
The project is built using **Node.js, Express.js, MongoDB, and EJS**, following the **MVC architecture** and RESTful routing.

---

## 🚀 Features

- 🏡 **CRUD Functionality** – Create, Read, Update, and Delete listings.  
- ⚙️ **Express Routing** – RESTful routes with clean URL structure.  
- 🧠 **Async Error Handling** – Custom utility (`wrapAsync`) for managing async/await errors.  
- 🎨 **EJS Templates with ejs-mate** – Layout-based templating for reusability.  
- ✍️ **Form Handling & Method Override** – Supports PUT and DELETE methods via forms.  
- 💾 **MongoDB Integration** – Data persistence using Mongoose models.  
- 🧱 **Project Structure** – Modular and organized code following best practices.  

---

## 🏗️ Project Status
> **🚧 Currently In Progress**
- ✅ CRUD routes completed  
- ✅ EJS templates integrated  
- ✅ MongoDB connection working  
- 🔜 Upcoming features:
  - User authentication (Login/Signup)
  - Form validation and error pages
  - Image upload functionality

---

## 📂 Folder Structure

```
wanderlust/
│
├── models/
│   └── listing.js
│
├── utils/
│   └── wrapAsync.js
│
├── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   └── show.ejs
│   └── layouts/
│       └── boilerplate.ejs
│
├── public/
│   └── (CSS, images, etc.)
│
├── app.js
└── package.json
```

---

## ⚙️ Technologies Used

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | Web framework for routing and middleware |
| **MongoDB** | NoSQL database for storing listings |
| **Mongoose** | MongoDB ODM for schema modeling |
| **EJS** | Template engine for rendering dynamic HTML |
| **ejs-mate** | Layout and partials support for EJS |
| **method-override** | Enables PUT/DELETE requests via forms |

---

## 💻 Installation and Setup

Follow these steps to run the project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/username/wanderlust.git

# 2️⃣ Move into the project directory
cd wanderlust

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start MongoDB (make sure it's running locally)
mongod

# 5️⃣ Run the application
node app.js
```

Now open your browser and visit 👉 **[http://localhost:8080](http://localhost:8080)**

---

## 🧩 Key Files Overview

### 🔹 `app.js`
Main server file that sets up routes, middleware, database connection, and error handling.

### 🔹 `models/listing.js`
Defines the Mongoose schema and model for listings.

### 🔹 `utils/wrapAsync.js`
Utility function to handle async route errors gracefully.

---

## ⚡ Example Routes

| Route | Method | Description |
|-------|---------|-------------|
| `/listings` | GET | Display all listings |
| `/listings/new` | GET | Show form to create a listing |
| `/listings` | POST | Create new listing |
| `/listings/:id` | GET | Show single listing |
| `/listings/:id/edit` | GET | Edit a listing |
| `/listings/:id` | PUT | Update listing |
| `/listings/:id` | DELETE | Delete listing |

---

## 🐞 Error Handling
A global error middleware is defined at the bottom of `app.js`:
```js
app.use((err, req, res, next) => {
    res.send("Something went wrong");
});
```
Later, a custom error page will be added for a better user experience.

---

## 📸 Screenshots (Optional)
> *(Add screenshots here once your frontend is ready)*

---

## 🤝 Contributing
Contributions are welcome!  
If you'd like to add features or fix bugs, feel free to fork the repository and create a pull request.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 🔗 GitHub Repository
[👉 Click here to view the project on GitHub](https://github.com/username/wanderlust)
