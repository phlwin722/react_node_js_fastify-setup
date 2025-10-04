// controllers/usersController.js
const UsersModel = require("../models/usersModel");

// Get current logged-in user
async function getProfile(fastify, request, reply) {
  try {
    // `fastify.authenticate` already verified token and attached user info
    const userId = request.user.id;

    // Fetch user from DB
    const user = await UsersModel.findUserById(fastify, userId);
    if (!user) return reply.code(404).send({ message: "User not found" });

    return reply.send(user); // { id, email }
  } catch (err) {
    return reply.code(500).send({ message: "Internal server error" });
  }
}

module.exports = { getProfile };
