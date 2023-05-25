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
  } catch (error) {}
}

module.exports = {
  createRoutines,
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
};
