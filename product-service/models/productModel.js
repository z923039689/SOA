let products = [];
let nextId = 1;

function createProduct({ name, price, stock }) {
  const product = {
    id: nextId++,
    name,
    price: Number(price),
    stock: Number(stock)
  };
  products.push(product);
  return product;
}

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

function updateProduct(id, data) {
  const product = getProductById(id);
  if (!product) return null;

  if (data.name !== undefined) product.name = data.name;
  if (data.price !== undefined) product.price = Number(data.price);
  if (data.stock !== undefined) product.stock = Number(data.stock);

  return product;
}

function deleteProduct(id) {
  const idx = products.findIndex((p) => p.id === Number(id));
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
