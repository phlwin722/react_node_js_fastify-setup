// usersRoutes.js
// Defines routes protected by JWT middleware with cookies)

const UsersController = require("../controllers/usersController");

async function usersRoutes(fastify, opts) {
  // ✅ Protect ALL routes under this file
  fastify.addHook("preHandler", fastify.authenticate);

  // ✅ Route: Get all items
  fastify.get("/api/me", (req, reply) =>
    UsersController.getProfile(fastify, req, reply)
  );
}

module.exports = usersRoutes;

