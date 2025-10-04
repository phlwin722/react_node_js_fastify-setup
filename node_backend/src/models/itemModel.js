// itemModel.js
// Handles DB queries for items table

async function createItem(fastify, item) {
  const conn = await fastify.mysql.getConnection(); // Get DB connection
  try {
    // Insert new item
    await conn.query(
      "INSERT INTO items (id, name, description) VALUES (?, ?, ?)",
      [item.id, item.name, item.description]
    );
  } finally {
    conn.release(); // Release connection
  }
}

async function getAllItems(fastify) {
  const conn = await fastify.mysql.getConnection();
  try {
    // Select all items
    const [rows] = await conn.query("SELECT * FROM items");
    return rows;
  } finally {
    conn.release();
  }
}

async function getItemById(fastify, id) {
  const conn = await fastify.mysql.getConnection();
  try {
    // Find item by ID
    const [rows] = await conn.query("SELECT * FROM items WHERE id = ?", [id]);
    return rows[0];
  } finally {
    conn.release();
  }
}

async function updateItem(fastify, id, data) {
  const conn = await fastify.mysql.getConnection();
  try {
    // Update item
    await conn.query("UPDATE items SET name=?, description=? WHERE id=?", [
      data.name,
      data.description,
      id,
    ]);
  } finally {
    conn.release();
  }
}

async function deleteItem(fastify, id) {
  const conn = await fastify.mysql.getConnection();
  try {
    // Delete item
    await conn.query("DELETE FROM items WHERE id=?", [id]);
  } finally {
    conn.release();
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
// Handles DB queries for items table
