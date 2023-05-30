const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users")); //allows you to require users.js

//GET /api/health
router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))

//GET /api/routines
router.use("/routines", require("./routines"));
router.get("/routines", (req, res, next) => {
  try {
    res.send("Routines!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
