const express = require("express");
const router = express.Router();
const {
  createRoutineActivities,
  getRoutineActivityById,
  updateRoutineActivity,
  deleteRoutineActivity,
} = require("../db/adapters/routine_activities");
const { requireUser, requireOwner } = require("./utility");

// POST /api/routine_activities
router.post("/", requireUser, async (req, res, next) => {
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
router.patch(
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
router.delete(
  "/:routineActivityId",
  requireUser,
  requireOwner,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      await deleteRoutineActivity({ routineActivityId });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

// Export the router
module.exports = router;
