const { getAllRoutines, createRoutine } = require("../db/adapters/routines");

const express = require("express");
const routinesRouter = express.Router();

//GET /api/routines
routinesRouter.get("/routines", async (req, res, next) => {
  try {
    const routines = await getAllRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/routines", async (req, res, next) => {
  try {
    const { name, goal, creator_id } = req.body;

    const newRoutine = await createRoutine({ name, goal, creator_id });

    if (newRoutine) {
      res.send(newRoutine);
    } else {
      next({
        name: "RoutineCreationError",
        message: "There was an error creating your routine. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
