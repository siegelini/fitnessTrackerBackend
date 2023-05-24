const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { createUser } = require("../db/adapters/users");

const SALT_ROUNDS = 10;
// const JWT_SECRET = "your-secret-key";

const express = require("express");
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser({ username, password: hashedPassword });

    delete user.password;

    // const token = jwt.sign(user, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
