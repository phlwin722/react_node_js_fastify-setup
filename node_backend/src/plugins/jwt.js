// jwt.js
// This plugin handles JWT authentication with HttpOnly cookies

const fp = require("fastify-plugin");
const fastifyJwt = require("@fastify/jwt");

async function jwtPlugin(fastify, opts) {
  // Register JWT with secret
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: "accessToken", // 👈 Tell JWT plugin to read from this cookie
      signed: false,
    },
  });

  // Decorator for protecting routes
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify(); // Will check token inside `accessToken` cookie
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });
}

module.exports = fp(jwtPlugin);
