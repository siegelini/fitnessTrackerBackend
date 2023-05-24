const client = require("../client");

async function createRoutineActivities({ duration, count }) {
  try {
    console.log("starting to insert RoutineActivities in db");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutineActivities,
};
