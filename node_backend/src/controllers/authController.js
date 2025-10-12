// controllers/authController.js
// Handles authentication logic (cookie-based)

const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword } = require("../utils/hash");
const UserModel = require("../models/authModel");

// REGISTER a new user
async function registerUser(fastify, request, reply) {
  const { first_name, last_name, email, password } = request.body;

  if (!email || !password) {
    return reply.code(400).send({ message: "Email & password required" });
  }

  const hashed = await hashPassword(password);
  const id = uuidv4();

  await UserModel.createUser(fastify, { id, first_name, last_name, email, password: hashed });

  return reply.send({ message: "User registered successfully" });
}

// LOGIN existing user
async function loginUser(fastify, request, reply) {
  const { email, password } = request.body;
  if (!email || !password) {
    return reply.code(400).send({ message: "Email & password required" });
  }

  const user = await UserModel.findUserByEmail(fastify, email);
  if (!user) return reply.code(401).send({ message: "Invalid credentials" });

  const valid = await comparePassword(password, user.password);
  if (!valid) return reply.code(401).send({ message: "Invalid credentials" });

  const accessToken = fastify.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "15m"});  
  const refreshToken = fastify.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "1day"});  

  // In loginUser
  reply
    .setCookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Lax", // Use Lax for development
      path: "/",
      maxAge: 15 * 60, // 15 minutes
    })
    .setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Lax", // Use Lax for development
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    })
    .send({ 
      message: "Login successful",
      type: "admin"
    });
}

// REFRESH token
async function refreshToken(fastify, request, reply) {
  const { refreshToken } = request.cookies;
  console.log("Cookies received:", request.cookies); // Debug

  if (!refreshToken) {
    console.log("No refresh token provided");
    return reply.code(401).send({ error: "No refresh token provided" });
  }

  try {
    const payload = await fastify.jwt.verify(refreshToken); // Await verification
    console.log("Refresh token payload:", payload); // Debug
    const newAccessToken = fastify.jwt.sign(
      { id: payload.id, email: payload.email },
      { expiresIn: "15m" }
    );

    reply
      .setCookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "Lax",
        path: "/",
        maxAge: 15 * 60,
      })
      .send({ message: "Token refreshed" });
  } catch (err) {
    console.error("Refresh token verification error:", err.message); // Debug
    return reply.code(403).send({ error: "Invalid or expired refresh token" });
  }
}

// LOGOUT
async function logoutUser(fastify, request, reply) {
  reply
    .clearCookie("accessToken", { path: "/signin" })
    .clearCookie("refreshToken", { path: "/signin" })
    .send({ message: "Logged out successfully" });
}

module.exports = { registerUser, loginUser, refreshToken, logoutUser };
