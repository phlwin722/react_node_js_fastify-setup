// models/usersModel.js
// Handles DB queries for users

async function findUserById(fastify, id) {
  const conn = await fastify.mysql.getConnection();
  try {
    const [rows] = await conn.query("SELECT id, first_name, last_name, email FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
}

module.exports = {
  findUserById,
};
