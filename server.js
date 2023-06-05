console.clear(); //clears the console...
require("dotenv").config();
const path = require("path"); //read file paths
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const app = express();

// PostgreSQL Client
const client = require("./db/client");
client.connect();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
app.use("/api", require("./routes"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Server App
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
