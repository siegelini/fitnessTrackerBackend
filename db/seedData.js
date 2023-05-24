// Create dummy data to seed into your DB
const users = [
  { username: "Edgard", password: 12345678 },
  { username: "Pawan", password: 12345678 },
];
const activities = [
  { name: "Bench Press", description: "This targets the pectoral muscles." },
  { name: "Dumbell Curls", description: "This targets the biceps." },
];
const routines = [
  { name: "Cardio", goal: "Walk for 10 minutes daily." },
  { name: "Eat Healthy", goal: "Eat 2,000 calories daily." },
];
const routine_activities = [
  { duration: 5, count: 15 },
  { duration: 5, count: 3 },
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
