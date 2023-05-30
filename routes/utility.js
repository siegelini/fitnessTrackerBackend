const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    console.log("Token: ", token);
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.send(401).send({
      loggedIn: false,
      message: "You ain't authorized, fool!!",
    });
    return;
  }
  next();
};

module.exports = { verifyToken };
