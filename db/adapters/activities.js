const client = require("../client");

async function createActivities({ name, description }) {
  try {
    console.log("Starting to insert ACTIVITIES into db");
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities(name, description)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(activityId) {
  try {
    console.log("...getting activities by id");
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT *
    FROM activities 
    WHERE id=$1;
    `,
      [activityId]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    console.log("..getting all activities");
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT *
    FROM activities;
    `
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

//needs help
async function updateActivity({ activityId, name, description }) {
  try {
    console.log("...updating activity");
    const {
      rows: [activity],
    } = await client.query(
      `
    UPDATE activities
    SET name = $1, description = $2
    WHERE id = $3;

    `,
      [name, description, activityId]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivities,
  getActivityById,
  getAllActivities,
  updateActivity,
};
