require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const activitiesRouter = require("./routes/activities");
app.use("/api", require("./routes"));
app.use("/routes/auth", authRouter);
app.use("/routes/users", userRouter);
app.use("/activities", activitiesRouter);

app.use("/api/routines", require("./routes/routines"));

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
