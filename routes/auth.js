const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser } = require("../db/adapters/users");
const router = require(".");

//POST /api/auth/signup
authRouter.post("/signup", async (req, res, next) => {
  // 404 error  on POST api/auth/signup
  ////
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post("delete");

module.exports = authRouter;
