const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

router.post("delete");
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));

// Hook up other Routers ex: router.use('/users', require('./users'))

module.exports = router;
