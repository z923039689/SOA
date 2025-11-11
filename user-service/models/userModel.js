

let users = [];
let nextId = 1;

function createUser({ name, email, password }) {
  const user = { id: nextId++, name, email, password };
  users.push(user);
  return user;
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === Number(id));
}

function getUserByEmail(email) {
  return users.find((u) => u.email === email);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail
};
