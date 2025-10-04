// mysql.js
// This plugin connects Fastify to MySQL

const fp = require('fastify-plugin');      // Allows us to create Fastify plugins
const fastifyMysql = require('@fastify/mysql'); // MySQL plugin for Fastify

async function mysqlPlugin(fastify, opts) {
  // Register MySQL connection with environment variables
  fastify.register(fastifyMysql, {
    promise: true,                        // Use async/await
    host: process.env.DB_HOST,            // DB host from .env
    user: process.env.DB_USER,            // DB username
    password: process.env.DB_PASSWORD,    // DB password
    database: process.env.DB_NAME,        // DB name
    port: process.env.DB_PORT             // DB port
  });
}

// Export plugin
module.exports = fp(mysqlPlugin);
// This plugin connects Fastify to MySQL