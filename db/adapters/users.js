const client = require("../client");
const bcrypt = require("bcrypt");

/* 
USERS 
*/
async function createUser({ username, password }) {
  try {
    // Make sure to hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const hashedUser = await user.createUser({
      username,
      password: hashedPassword,
    });

    const {
      rows: [user],
    } = client.query(
      `
    INSERT INTO users(username, password),
    VALUES($1, $2),
    ON CONFLICT (username) DO NOTHING,
    RETURNING *;
    `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
};
