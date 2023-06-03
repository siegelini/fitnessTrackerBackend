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

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1;
      `[username]
    );

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }

    return null; // null if not found - or should it be results?
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${userId}
    `);

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that id does not exist",
      };
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username FROM users WHERE username = $1;
      `,
      [username]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "A user with that username does not exist",
      };
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
