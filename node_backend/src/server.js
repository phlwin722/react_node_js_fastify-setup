// server.js
// Main entry point of Fastify server

require('dotenv').config();                   // Load .env variables (DB, JWT, PORT)
const Fastify = require('fastify');           // Import Fastify
const cors = require("@fastify/cors");

// Plugins
const mysqlPlugin = require('./plugins/mysql'); // MySQL plugin
const jwtPlugin = require('./plugins/jwt');     // JWT plugin

// Routes
const authRoutes = require('./routes/authRoutes'); // Auth routes
const itemRoutes = require('./routes/itemRoutes'); // Item routes
const usersRoutes = require("./routes/usersRoutes"); // User routes

// Create Fastify instance
const fastify = Fastify({ logger: true });

// ✅ Register CORS (must come before routes)
fastify.register(cors, {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // your frontend dev URL
  credentials: true,  // allow Authorization headers / cookies
});

// Register plugins
fastify.register(mysqlPlugin);  // Connect MySQL
fastify.register(jwtPlugin);    // Enable JWT

// Register routes
fastify.register(authRoutes);   // Authentication routes
fastify.register(itemRoutes);   // CRUD item routes
fastify.register(usersRoutes);  // User routes

// Start server
const PORT = process.env.PORT || 4000;
fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);     // Log errors
    process.exit(1);            // Exit app if failed
  }
  fastify.log.info(`Server running at ${address}`); // Log success
});
