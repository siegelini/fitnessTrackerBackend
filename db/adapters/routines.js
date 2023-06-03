const client = require("../client");

async function createRoutines({ name, goal, creator_id, is_public }) {
  try {
    console.log("starting to insert ROUTINES into db ");
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines(name, goal, creator_id, is_public)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [name, goal, creator_id, is_public]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

//missing from clause
async function getRoutineById(id) {
  try {
    console.log("Getting a routine by id...");
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      routines.creator_id as creator_id,
    CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
      JSON_BUILD_OBJECT (
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
      )
    ) END AS activities
    FROM routines
    LEFT JOIN routine_activities 
    ON routines.id = routine_activities.routine_id
    LEFT JOIN activities 
    ON routines.id = routine_activities.routine_id
    WHERE routines.id = $1
    GROUP BY routines.id, routine_activities.routine_id
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
    SELECT 
    routines.id as id,
    routines.name as name,
    routines.goal as goal,
    routines.creator_id as creator_id,
  CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
  ELSE 
  JSON_AGG(
    JSON_BUILD_OBJECT (
      'id', activities.id,
      'name', activities.name,
      'description', activities.description,
      'duration', routine_activities.duration,
      'count', routine_activities.count
    )
  ) END AS activities
  FROM routines
  LEFT JOIN routine_activities 
  ON routines.id = routine_activities.routine_id
  LEFT JOIN activities 
  ON routine_activities.activity_id = activities.id
  GROUP BY routines.id, routine_activities.routine_id
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
    SELECT 
    routines.id as id,
    routines.name as name,
    routines.goal as goal,
    routines.creator_id as creator_id,
  CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
  ELSE 
  JSON_AGG(
    JSON_BUILD_OBJECT (
      'id', activities.id,
      'name', activities.name,
      'description', activities.description,
      'duration', routine_activities.duration,
      'count', routine_activities.count
    )
  ) END AS activities
  FROM routines
  LEFT JOIN routine_activities 
  ON routines.id = routine_activities.routine_id
  LEFT JOIN activities 
  ON routine_activities.activity_id = activities.id
  JOIN users
  ON users.id = routines.creator_id
  WHERE routines.is_public = true
  GROUP BY routines.id, routine_activities.routine_id
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
      SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      routines.creator_id as creator_id,
    CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
      JSON_BUILD_OBJECT (
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
      )
    ) END AS activities
    FROM routines
    LEFT JOIN routine_activities 
    ON routines.id = routine_activities.routine_id
    LEFT JOIN activities 
    ON routine_activities.activity_id = activities.id
    JOIN users
    ON users.id = routines.creator_id
    WHERE users.username = $1
    GROUP BY routines.id, routine_activities.routine_id
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
      SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      routines.creator_id as creator_id,
    CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
      JSON_BUILD_OBJECT (
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
      )
    ) END AS activities
    FROM routines
    LEFT JOIN routine_activities 
    ON routines.id = routine_activities.routine_id
    LEFT JOIN activities 
    ON routine_activities.activity_id = activities.id
    JOIN users
    ON users.id = routines.creator_id
    WHERE routines.is_public = true AND users.username = $1
    GROUP BY routines.id, routine_activities.routine_id
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
      `    
      SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      routines.creator_id as creator_id,
    CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
    ELSE 
    JSON_AGG(
      JSON_BUILD_OBJECT (
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'duration', routine_activities.duration,
        'count', routine_activities.count
      )
    ) END AS activities
    FROM routines
    LEFT JOIN routine_activities 
    ON routines.id = routine_activities.routine_id
    LEFT JOIN activities 
    ON routine_activities.activity_id = activities.id
    WHERE routines.is_public = true AND routine_activities.activity_id = $1
    GROUP BY routines.id, routine_activities.routine_id
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
  } catch (error) {
    throw error;
  }
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
  } catch (error) {
    throw error;
  }
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
