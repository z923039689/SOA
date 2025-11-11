const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../models/productModel");

// POST /api/products
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price === undefined || stock === undefined) {
    return res
      .status(400)
      .json({ message: "name, price and stock are required" });
  }

  const product = createProduct({ name, price, stock });
  res.status(201).json(product);
});

// GET /api/products
router.get("/", (req, res) => {
  res.json(getAllProducts());
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// PUT /api/products/:id
router.put("/:id", (req, res) => {
  const product = updateProduct(req.params.id, req.body);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  const ok = deleteProduct(req.params.id);
  if (!ok) return res.status(404).json({ message: "Product not found" });
  res.status(204).send();
});

module.exports = router;
