require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const PORT = 3000;

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello");
});

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", require("./routes"));
app.use("/routes/auth.js", authRouter);
app.use("/routes/users.js", userRouter);

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
