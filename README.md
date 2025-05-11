# 📝 Todo List API

A simple RESTful API built with **TypeScript** and **Express** for todo-list management.

📌 [Project Requirements](https://roadmap.sh/projects/todo-list-api)

---

## 🚀 Features

- User registration and login with JWT
- Secure password storage using bcrypt
- Full CRUD for to-do items
- Auth-middleware for token-based route protection
- Pagination for retrieving todos
- Input validation and error handling

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Database:** Good ole arrays
- **Dev Tools:** Nodemon, dotenv

---

## ⚙️ Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/michaelmontelli/Todo-List-API.git
   cd todo-list-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` with your config (e.g. JWT secret, database URL).

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📬 API Usage

All requests expect `Content-Type: application/json`. Most routes require an `Authorization: Bearer <token>` header.

### 🔐 Register
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gmail.com", "password": "password"}'
```

### 🔐 Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gmail.com", "password": "password"}'
```

### ➕ Create a To-Do
```bash
curl -X POST http://localhost:3000/todos \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean cat litter", "description": "Take care of the pets!"}'
```

### ✏️ Update a To-Do
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Cut grass", "description": "The grass is long!"}'
```

### ❌ Delete a To-Do
```bash
curl -X DELETE http://localhost:3000/todos/1 \
  -H "Authorization: Bearer <your-token>"
```

### 📄 Get Paginated To-Dos
```bash
curl -X GET "http://localhost:3000/todos?page=1&limit=10" \
  -H "Authorization: Bearer <your-token>"
```

---

## 📄 License

MIT
