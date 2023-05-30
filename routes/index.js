const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))

module.exports = router;
