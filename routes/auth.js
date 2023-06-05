const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { JWT_SECRET, COOKIE_SECRET } = process.env;
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { verifyToken } = require("./utility");

const express = require("express");
const authRouter = express.Router();

//GET api/auth/
authRouter.get("/", (req, res, next) => {
  res.send("We have the Auth router!!!");
});

//POST api/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password.length < 8) {
      next({
        message: "Password should be at least 8 characters long.",
        name: "Authorization Error",
      });
    }

    const existingUser = await getUserByUsername(username);
    console.log({ existingUser });
    if (existingUser) {
      next({
        message: "Username already exists",
        name: "Authorization Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });

    const tokenUserNoPassword = { id: user.id, username: user.username };
    const token = jwt.sign(tokenUserNoPassword, JWT_SECRET, {
      expiresIn: "1w",
    });

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
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

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1w" });
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.json({ message: "login successful" });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
    // need to clear jwt or just the 1 week expire ok?
    res.clearCookie("token"); // Clear the token cookie
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
});

authRouter.use(verifyToken);

module.exports = authRouter;
