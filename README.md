# SOA Final Project - Part 1: Microservices Design and Dockerization

Seneca College - Business Information Technology Program  

---

## 📌 Project Overview
This project is Part 1 of the **Microservices Architecture and Deployment Project**.  
It demonstrates the design and implementation of **two independent microservices** —  
**User Service** and **Product Service** — using Node.js and Express.  

Each service runs as a separate container and exposes its own RESTful API.  
The project uses **Docker** and **Docker Compose** to containerize and run both services locally.  

---

## 🧩 Microservices Implemented

### 1️⃣ User Service
- Handles user registration, login, and basic profile data.
- Exposes RESTful endpoints under `/api/users`.
- Stores data in memory (for Part 1 simplicity).

**Example Endpoints**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | User login |
| `GET`  | `/api/users` | Get all registered users |

---

### 2️⃣ Product Service
- Manages a simple product catalog.
- Exposes RESTful endpoints under `/api/products`.
- Returns static or in-memory JSON data.

**Example Endpoints**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/api/products` | Get list of products |
| `POST` | `/api/products` | Add a new product |
| `GET` | `/api/products/:id` | Get product by ID |

---

## 🐳 Dockerization

### Each Service Has:
- Its own `Dockerfile` (based on **node:20-alpine**).
- `.dockerignore` file to exclude `node_modules` and temp files.

Example `Dockerfile` structure:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
