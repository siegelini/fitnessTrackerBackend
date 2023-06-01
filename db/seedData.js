// Create dummy data to seed into your DB
const users = [
  { username: "Edgard", password: 12345678 },
  { username: "Pawan", password: 12345678 },
  { username: "Adam", password: 12345678 },
];
const activities = [
  {
    name: "Bench Press",
    description: "This targets the pectoral muscles.",
  },
  {
    name: "Dumbell Curls",
    description: "This targets the biceps.",
  },
  {
    name: "Best Push Ups",
    description: "One finger like Rocky, clapping at the top",
  },
];
const routines = [
  {
    creator_id: 1,
    is_public: true,
    name: "Cardio",
    goal: "Walk for 10 minutes daily.",
  },
  {
    creator_id: 2,
    name: "Eat Healthy",
    goal: "Eat 2,000 calories daily.",
    is_public: true,
  },
  {
    creator_id: 3,
    name: "Stay Alive",
    goal: "Run faster than friend being chased by a bear",
    is_public: false,
  },
];
const routine_activities = [
  { routine_id: 1, activity_id: 1, duration: 5, count: 15 },
  { routine_id: 1, activity_id: 2, duration: 5, count: 3 },
  { routine_id: 2, activity_id: 2, duration: 5, count: 10 },
];

module.exports = { users, activities, routines, routine_activities };

/**
 * 1. Create Dummy Data
 * 2. Define (Create) the table definition
 * 3. Write a "create---" function
 * 4. Populate the tables:
 *         Loop over dummy data and for each piece of dummyData
 *         call the create--- function and pass the dummyData in
 */
