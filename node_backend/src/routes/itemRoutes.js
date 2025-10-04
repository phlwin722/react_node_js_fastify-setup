// itemRoutes.js
// Defines routes for CRUD items (protected by JWT middleware with cookies)

const ItemController = require("../controllers/itemController");

async function itemRoutes(fastify, opts) {
  // ✅ Protect ALL routes under this file
  fastify.addHook("preHandler", fastify.authenticate);

  // ✅ Route: Get all items
  fastify.get("/api/items", (req, reply) =>
    ItemController.getItemsHandler(fastify, req, reply)
  );

  // ✅ Route: Create new item
  fastify.post("/api/items", (req, reply) =>
    ItemController.createItemHandler(fastify, req, reply)
  );

  // ✅ Route: Get single item by ID
  fastify.get("/api/items/:id", (req, reply) =>
    ItemController.getItemHandler(fastify, req, reply)
  );

  // ✅ Route: Update item by ID
  fastify.put("/api/items/:id", (req, reply) =>
    ItemController.updateItemHandler(fastify, req, reply)
  );

  // ✅ Route: Delete item by ID
  fastify.delete("/api/items/:id", (req, reply) =>
    ItemController.deleteItemHandler(fastify, req, reply)
  );
}

module.exports = itemRoutes;
