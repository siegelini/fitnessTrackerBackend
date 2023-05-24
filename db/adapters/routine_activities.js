const client = require("../client");

async function createRoutineActivities({ duration, count }) {
  try {
    console.log("starting to insert RoutineActivities in db");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    INSERT INTO routine_activities(duration, count)
    VALUES ($1, $2)
    RETURNING *
    `,
      [duration, count]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutineActivities,
};
