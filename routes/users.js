const usersRouter = require("express").Router();
const router = require(".");
const { getUser } = require("../db/adapters/users");

// GET/api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getUser();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/signup");

module.exports = usersRouter;

router.post("delete");
