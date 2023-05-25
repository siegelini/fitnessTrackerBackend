const client = require("../client");

async function createRoutines({ name, goal }) {
  try {
    console.log("starting to insert ROUTINES into db ");
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines(name, goal)
    VALUES ($1, $2)
    RETURNING *;
    `,
      [name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    console.log("Getting a routine by id...");
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT *
    FROM routines
    JOIN activities ON routine.id = activities.routine_id
    WHERE routines.id = $1;
    `,
      [id]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    console.log("...getting routines without activities");
    const {
      rows: [routine],
    } = await client.query(`
  SELECT *
  FROM routines;
  `);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    console.log("..getting all routines");
    const {
      rows: [routine],
    } = await client.query(`
    SELECT *
    FROM routines
    JOIN activities ON routines;
    `);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    console.log("...getting all public routines");
    const {
      rows: [routine],
    } = await client.query(`
    SELECT *
    FROM routines
    WHERE is_public = true
    JOIN activities ON routine.id = activities.routine_id;
    `);
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    console.log("...getting all routines by user");
    const {
      rows: [routine],
    } = await client.query(
      `
     SELECT *
     FROM routines
     WHERE creator_id = $1  
     JOIN activities ON routine.id = activities.routine_id;
     `,
      [username]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser(username) {
  try {
    console.log("...getting all public routines by user");
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE creator_id = $1 AND is_public = true
    JOIN activities ON routines.id = activities.routine_id;
    `,
      [username]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity(activity_id) {
  try {
    console.log("...getting all public routines by activity");
    const { rows } = await client.query(
      `SELECT 
      routines.*, 
      activities.*
    FROM 
      routines 
      JOIN routine_activities ON routines.id = routine_activities.routine_id 
      JOIN activities ON routine_activities.activity_id = activities.id
    WHERE 
      routines.is_public = true AND routine_activities.activity_id = $1;
    `,
      [activity_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createRoutine(creatorId, isPublic, name, goal) {
  try {
    console.log("starting to insert ROUTINES into db ");
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines(creator_id, is_public, name, goal)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine(routineId, isPublic, name, goal) {
  try {
    console.log("updating routine...");
    const {
      rows: [routine],
    } = await client.query(
      `
    UPDATE routines
    SET is_public = $1, name = $2, goal = $3
    WHERE id = $4;
    `,
      [isPublic, name, goal, routineId]
    );
    return routine;
  } catch (error) {}
}

async function destroyRoutine(routineId) {
  try {
    console.log("destroying routine...");
    await client.query(
      `
    DELETE FROM routines
    WHERE id = $1;
    `,
      [routineId]
    );
    await client.query(
      `
    DELETE FROM activities
    WHERE routine_id = $1;
    `,
      [routineId]
    );
  } catch (error) {}
}

module.exports = {
  createRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
