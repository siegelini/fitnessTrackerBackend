const { getUserByUsername } = require("../db/adaptors/users");
const { verifyToken } = require("..");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/me", verifyToken, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    res.json({ id, username });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsername(username);
    if (!user) {
      throw {
        name: "NotFoundError",
        message: "User not found.",
      };
    }

    // Fetch and return the public routines for the user
    const routines = []; // Fetch the routines for the user

    res.json({ username, routines });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
