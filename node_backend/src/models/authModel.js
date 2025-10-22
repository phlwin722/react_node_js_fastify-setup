// authModel.js
// Handles DB queries for "users" table

// Create new user in DB
async function createUser(fastify, { id, first_name, last_name, email, password }) {
  const conn = await fastify.mysql.getConnection(); // Open DB connection
  try {
    await conn.query(
      "INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [id, first_name, last_name, email, password]
    );
  } finally {
    conn.release(); // Always release DB connection
  }
}

// Find user by email
async function findUserByEmail(fastify, email) {
  const conn = await fastify.mysql.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0]; // Return user record
  } finally {
    conn.release();
  }
}

// Save (or remove) refresh token
async function saveRefreshToken(fastify, userId, token) {
  const conn = await fastify.mysql.getConnection();
  try {
    await conn.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      token,
      userId,
    ]);
  } finally {
    conn.release();
  }
}

// Find user by refresh token
async function findUserByRefreshToken(fastify, token) {
  const conn = await fastify.mysql.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT * FROM users WHERE refresh_token = ?",
      [token]
    );
    return rows[0];
  } finally {
    conn.release();
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  findUserByRefreshToken,
};



