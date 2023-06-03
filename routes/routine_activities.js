const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  createRoutineActivities,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

//if need later to see if logged in, maybe something like this:
// const { requireUser, requireOwner } = require("./utility");
// const routinesRouter = require("./routines");
//obviously will need to update the utility if this is how we go to do it.

// POST /api/routine_activities
routineActivitiesRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const { duration, count, routine_id, activity_id } = req.body;
    const routineActivity = await createRoutineActivities({
      duration,
      count,
      routine_id,
      activity_id,
    });
    res.status(201).json(routineActivity);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  requireOwner,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const { count, duration } = req.body;
      const routineActivity = await updateRoutineActivity({
        routineActivityId,
        count,
        duration,
      });
      res.json(routineActivity);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  requireOwner,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      await destroyRoutineActivity({ routineActivityId });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
