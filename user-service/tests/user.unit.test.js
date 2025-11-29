const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail
} = require('../models/userModel');

describe('User model - unit tests', () => {
  it('should return an array of users', () => {
    const list = getAllUsers();
    expect(Array.isArray(list)).toBe(true);
  });

  it('should allow creating a new user', () => {
    const before = getAllUsers().length;

    const newUser = createUser({
      name: 'Hanbo',
      email: 'unit-test@example.com',
      password: '123456'
    });

    const after = getAllUsers().length;

    expect(after).toBe(before + 1);
    expect(newUser).toBeDefined();
    expect(newUser.id).toBeGreaterThan(0);
    expect(newUser.email).toBe('unit-test@example.com');
  });

  it('should find a user by id', () => {
    const user = createUser({
      name: 'FindById',
      email: 'findbyid@example.com',
      password: '123456'
    });

    const found = getUserById(user.id);
    expect(found).toBeDefined();
    expect(found.email).toBe('findbyid@example.com');
  });

  it('should find a user by email', () => {
    const email = 'findbyemail@example.com';
    createUser({
      name: 'FindByEmail',
      email,
      password: '123456'
    });

    const found = getUserByEmail(email);
    expect(found).toBeDefined();
    expect(found.email).toBe(email);
  });
});
