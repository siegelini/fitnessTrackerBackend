const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/adapters/routines");

const express = require("express");
const authRouter = require("./auth");
const routinesRouter = express.Router();

//GET /api/routines
routinesRouter.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const routines = await getAllRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

//POST /api/routines
routinesRouter.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, goal, creator_id, is_public } = req.body;
    const newRoutine = await createRoutine({
      name,
      goal,
      creator_id,
      is_public,
    });
    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/routineId
routinesRouter.patch("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { name, goal, is_public } = req.body;
    const updatedRoutine = await updateRoutine(routineId, {
      is_public,
      name,
      goal,
    });
    res.send(updatedRoutine);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/routines/:routineId
routinesRouter.delete("/:routineId", authRouter, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const deletedRoutine = await destroyRoutine(routineId);
    res.send(deletedRoutine);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
