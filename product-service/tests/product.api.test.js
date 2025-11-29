const request = require('supertest');
const app = require('../server');

describe('Product API - integration & e2e', () => {
  const product = {
    id: 1,
    name: 'Wireless Mouse',
    description: '2.4GHz wireless mouse',
    price: 25.99,
    category: 'Electronics',
    stock: 50
  };

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send(product);

    expect(res.statusCode).toBe(201);  
    expect(res.body.name).toBe(product.name);
  });

  it('should return the list of products', async () => {
    const res = await request(app)
      .get('/api/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
