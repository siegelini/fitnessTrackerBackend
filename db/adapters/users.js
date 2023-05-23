const client = require("../client");
/* 
USERS 
*/
async function createUser({ username, password }) {
  try {
    console.log("Starting to insert USER into db");
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;`,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
};
