const request = require('supertest');
const app = require('../server');

describe('User API - integration & e2e', () => {
  const baseUser = {
    name: 'TestUser',
    email: 'testuser@example.com',
    password: '123456'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(baseUser);

    expect(res.statusCode).toBe(201);   
    expect(res.body.email).toBe(baseUser.email);
  });

  it('should not register the same email twice', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(baseUser);

    expect(res.statusCode).toBe(409);     
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: baseUser.email,
        password: baseUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/success/i);
  });
});
