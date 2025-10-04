// authRoutes.js
// Defines authentication routes

const AuthController = require("../controllers/authController"); // Import controller

async function authRoutes(fastify, opts) {
  // Route: Register user
  fastify.post("/api/register", (req, reply) =>
    AuthController.registerUser(fastify, req, reply)
  );

  // Route: Login user
  fastify.post("/api/login", (req, reply) =>
    AuthController.loginUser(fastify, req, reply)
  );

  // Route: Refresh token
  fastify.post("/api/refresh", (req, reply) =>
    AuthController.refreshToken(fastify, req, reply)
  );

  // Route: Logout user
  fastify.post("/api/logout", (req, reply) =>
    AuthController.logoutUser(fastify, req, reply)
  );
}

module.exports = authRoutes; // Export route
