const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail
} = require("../models/userModel");

// POST /api/users/register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const user = createUser({ name, email, password });
  const { password: _, ...publicUser } = user; // 不返回密码
  res.status(201).json(publicUser);
});

// POST /api/users/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    userId: user.id
    // 以后可以加 JWT
  });
});

// GET /api/users
router.get("/", (req, res) => {
  const users = getAllUsers().map(({ password, ...u }) => u);
  res.json(users);
});

// GET /api/users/:id
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { password, ...publicUser } = user;
  res.json(publicUser);
});

module.exports = router;
