require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../db/adapters/users");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password.length < 8) {
      throw {
        name: "ValidationError",
        message: "Password should be at least 8 characters long.",
      };
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw {
        name: "ValidationError",
        message: "Username already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser({ username, password: hashedPassword });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    delete user.password;

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsername(username);
    if (!user) {
      throw {
        name: "AuthenticationError",
        message: "Invalid username or password.",
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw {
        name: "AuthenticationError",
        message: "Invalid username or password.",
      };
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
