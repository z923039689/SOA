const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Product Service is running" });
});

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Product Service listening on port ${PORT}`);
});
