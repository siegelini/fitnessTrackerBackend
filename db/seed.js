const client = require("./client");
//imports
const { createUser } = require("./adapters/users");
const { createActivities } = require("./adapters/activities");
const { createRoutines } = require("./adapters/routines");
const { createRoutineActivities } = require("./adapters/routine_activities");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  // Drop all tables in order
  console.log("Starting to drop tables...");
  try {
    await client.query(`
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  // Define your tables and fields
  console.log("starting to create tables...");
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await client.query(`
    CREATE TABLE activities(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL
    )
    `);

    await client.query(`
    CREATE TABLE routines(
      id SERIAL PRIMARY KEY,
      creator_id INTEGER REFERENCES users(id),
      is_public BOOLEAN DEFAULT false,
      name VARCHAR(255) UNIQUE NOT NULL,
      goal TEXT NOT NULL
    )
    `);

    await client.query(`
    CREATE TABLE routine_activities(
      id SERIAL PRIMARY KEY,
      routine_id INTEGER REFERENCES routines ( id ),
      activity_id INTEGER REFERENCES activities ( id ),
      duration INTEGER,
      count INTEGER
    )
    `);
  } catch (error) {
    console.error(error);
  }
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
  console.log("Starting to populate tables...");
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("...users created");

    for (const activity of activities) {
      console.log("Activities:", activity);
      await createActivities(activity);
    }
    console.log("...activities created");

    for (const routine of routines) {
      console.log("Routines:", routine);
      await createRoutines(routine);
    }
    console.log("...routines created");

    for (const routine_activity of routine_activities) {
      console.log("Routines and Activities:", routine_activity);
      await createRoutineActivities(routine_activity);
    }
    console.log("...routine_activities created");
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
