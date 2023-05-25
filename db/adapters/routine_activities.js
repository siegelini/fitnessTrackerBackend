const client = require("../client");

async function createRoutineActivities({
  duration,
  count,
  routine_id,
  activity_id,
}) {
  try {
    console.log("starting to insert RoutineActivities in db");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    INSERT INTO routine_activities(duration, count, routine_id, activity_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [duration, count, routine_id, activity_id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutineActivities,
};
