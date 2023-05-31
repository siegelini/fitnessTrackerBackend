const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users")); //allows you to require users.js
router.use("/routines", require("./routines")); //allows you to require routines.js
router.use("/activites", require("./activities")); //allows you to require activities.js
// router.use("/RoutineActivites", require("./routine_activities"));

//GET /api/health
router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))
const usersRouter = require("./users");

module.exports = router;
