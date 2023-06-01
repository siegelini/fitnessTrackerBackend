console.clear(); //clears the console...
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const PORT = 3000;
const app = express();

// PostgreSQL Client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/api", require("./routes"));

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});
// not sure if this is the shortest way to do this but wanted to see the connection
// Connect to PostgreSQL
client.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return;
  }
  console.log("Connected to PostgreSQL database!");
});

// Server App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
