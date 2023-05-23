const client = require("../client");

async function createRoutines({ name, goal }) {
  try {
    console.log("starting to insert ROUTINES into db ");
    const {
      rows: [routine],
    } = await client.query(`
    
    `);
    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutines,
};
