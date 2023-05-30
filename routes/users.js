const { getUserByUsername } = require("../db/adapters/users");
const { verifyToken } = require("../routes/utility");

const express = require("express");
const userRouter = express.Router();

//GET /api/users/
userRouter.get("/", (req, res, next) => {
  res.send("USERS COMING SOON!");
});

//GET /api/users/me
userRouter.get("/me", verifyToken, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    res.json({ id, username });
  } catch (error) {
    next(error);
  }
});

//GET api/:username/routines
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
