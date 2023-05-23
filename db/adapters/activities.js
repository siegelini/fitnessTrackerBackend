const client = require("../client");

async function createActivities({ name, descritpiton }) {
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
      [name, descritpiton]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivities,
};
