// itemController.js
// Handles CRUD logic for items

const { v4: uuidv4 } = require("uuid"); // Generate unique IDs
const ItemModel = require("../models/itemModel"); // Item model

async function createItemHandler(fastify, request, reply) {
  const { name, description } = request.body; // Get data from request
  if (!name) return reply.code(400).send({ message: "Name required" });

  // Generate unique item ID
  const id = uuidv4();

  // Save item in DB
  await ItemModel.createItem(fastify, { id, name, description });

  // Return new item
  return reply.code(201).send({ id, name, description });
}

async function getItemsHandler(fastify, request, reply) {
  // Get all items
  const rows = await ItemModel.getAllItems(fastify);
  return reply.send(rows);
}

async function getItemHandler(fastify, request, reply) {
  const { id } = request.params; // Get ID from URL
  const item = await ItemModel.getItemById(fastify, id);
  if (!item) return reply.code(404).send({ message: "Not found" });
  return reply.send(item);
}

async function updateItemHandler(fastify, request, reply) {
  const { id } = request.params; // Item ID
  const { name, description } = request.body; // Updated data

  // Update item
  await ItemModel.updateItem(fastify, id, { name, description });

  return reply.send({ message: "Updated" });
}

async function deleteItemHandler(fastify, request, reply) {
  const { id } = request.params; // Item ID

  // Delete item
  await ItemModel.deleteItem(fastify, id);

  return reply.send({ message: "Deleted" });
}

module.exports = {
  createItemHandler,
  getItemsHandler,
  getItemHandler,
  updateItemHandler,
  deleteItemHandler,
};
// Handles CRUD logic for items
