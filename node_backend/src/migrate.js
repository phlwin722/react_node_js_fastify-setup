// migrate.js
// Script to auto-drop and recreate database tables (like Laravel migrate:fresh)

require('dotenv').config();                  // Load .env file
const mysql = require('mysql2/promise');     // Import mysql2 with promise support

async function migrate() {
  // Create MySQL connection
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,               // Database host (127.0.0.1 by default)
    user: process.env.DB_USER,               // Database username
    password: process.env.DB_PASSWORD,       // Database password
    database: process.env.DB_NAME,           // Database name
    port: process.env.DB_PORT                // Database port (default 3306)
  });

  console.log('✅ Connected to database');

  // Drop existing tables (order matters: drop items first since it could depend on users in future)
  await conn.query(`DROP TABLE IF EXISTS items`);
  await conn.query(`DROP TABLE IF EXISTS users`);
    await conn.query(`DROP TABLE IF EXISTS blacklisted_tokens`);
  console.log('🗑️ Old tables dropped (if they existed)');

  // Create users table (fresh)
  await conn.query(`
    CREATE TABLE users (
      id CHAR(36) PRIMARY KEY,               -- UUID v4 (always 36 chars)
      first_name VARCHAR(255) NOT NULL,            -- Item first name
      last_name VARCHAR(255) NOT NULL,            -- Item last name
      email VARCHAR(255) NOT NULL UNIQUE,    -- Unique email
      password VARCHAR(255) NOT NULL,        -- Hashed password (bcrypt)
      refresh_token TEXT,                    -- store latest refresh token
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp auto generated
    )
  `);

  console.log('✅ Users table created');
  
  // Create items table (fresh)
  await conn.query(`
    CREATE TABLE items (
      id CHAR(36) PRIMARY KEY,               -- UUID v4
      name VARCHAR(255) NOT NULL,            -- Item name
      description TEXT,                      -- Optional description
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Auto timestamp
    )
  `);

  console.log('✅ Items table created');

  await conn.end(); // Close DB connection
  console.log('🎉 Migration complete (fresh tables ready)');
}

// Run migration
migrate().catch(err => {
  console.error('❌ Migration failed:', err);
});
