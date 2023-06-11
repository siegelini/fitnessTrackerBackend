const express = require("express");
const { verifyToken } = require("../routes/utility");
const {
  createActivities,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("../db/adapters/activities");

const activitiesRouter = express.Router();

//GET api/activites/
// activitiesRouter.get("/", (req, res, next) => {
//   res.send("We have Activites!!!");
// });

// GET /activities
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// POST /activities
activitiesRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newActivity = await createActivities({ name, description });
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});

// PATCH /activities/:activityId
activitiesRouter.patch("/:activityId", async (req, res, next) => {
  try {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updatedActivity = await updateActivity(activityId, {
      name,
      description,
    });
    res.json(updatedActivity);
  } catch (error) {
    next(error);
  }
});

// GET /activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  try {
    const { activityId } = req.params;

    // Retrieve the activity by its ID
    const activity = await getActivityById(activityId);

    if (!activity) {
      throw {
        name: "NotFoundError",
        message: "Activity not found.",
      };
    }

    // Fetch and return the public routines featuring the activity
    const routines = []; // Fetch the routines for the activity

    res.json({ activity, routines });
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
