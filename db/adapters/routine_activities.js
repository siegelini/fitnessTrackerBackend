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

async function getRoutineActivityById(routineActivityId) {
  try {
    console.log("...getting routine_activity by id");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    SELECT *
    FROM routine_activities
    WHERE id=$1;
    `,
      [routineActivityId]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine({
  routine_id,
  activity_id,
  count,
  duration,
}) {
  try {
    console.log("adding activity to routine");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    INSERT INTO routine_activities(routine_id, activity_id, count, duration)
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `,
      [routine_id, activity_id, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ routineActivityId, count, duration }) {
  try {
    console.log("updating RoutineActivity");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    SELECT * 
    FROM routine_activities
    WHERE id = ${routineActivityId}
    UPDATE routine_activity SET count=$1, duration=$2;
    `,
      [routineActivityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity({ routineActivityId }) {
  try {
    console.log("deleting RoutineActivities");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    DELETE routine_activities
    WHERE id=$1;
    `,
      [routineActivityId]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ routine_id }) {
  try {
    console.log("getting routine_activities by routines");
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    SELECT *
    FROM routine_activity
    WHERE id = $1;
    `,
      [routine_id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutineActivities,
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
