const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../models/productModel');

describe('Product model - unit tests', () => {
  it('should return an array of products', () => {
    const list = getAllProducts();
    expect(Array.isArray(list)).toBe(true);
  });

  it('should allow creating a new product', () => {
    const before = getAllProducts().length;

    const product = createProduct({
      name: 'Wireless Mouse',
      price: 25.99,
      stock: 50
    });

    const after = getAllProducts().length;

    expect(after).toBe(before + 1);
    expect(product).toBeDefined();
    expect(product.id).toBeGreaterThan(0);
    expect(product.name).toBe('Wireless Mouse');
    expect(product.price).toBe(25.99);
    expect(product.stock).toBe(50);
  });

  it('should find a product by id', () => {
    const created = createProduct({
      name: 'Keyboard',
      price: 49.99,
      stock: 20
    });

    const found = getProductById(created.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('Keyboard');
  });

  it('should update an existing product', () => {
    const created = createProduct({
      name: 'Monitor',
      price: 199.99,
      stock: 10
    });

    const updated = updateProduct(created.id, {
      price: 179.99,
      stock: 8
    });

    expect(updated).not.toBeNull();
    expect(updated.price).toBe(179.99);
    expect(updated.stock).toBe(8);
  });

  it('should delete a product by id', () => {
    const created = createProduct({
      name: 'USB Cable',
      price: 9.99,
      stock: 100
    });

    const ok = deleteProduct(created.id);
    expect(ok).toBe(true);

    const found = getProductById(created.id);
    expect(found).toBeUndefined();
  });
});
