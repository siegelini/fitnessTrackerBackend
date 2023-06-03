const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (!token) {
      throw new Error("No token found.");
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      loggedIn: false,
      message: "You ain't authorized, fool!!",
    });
  }
};

const requireOwner = async (req, res, next) => {
  const { user, params } = req;
  const { routineId, activityId } = params;

  try {
    // get from db, assumming these are good too
    const routine = await getRoutineById(routineId);
    const activity = await getActivityById(activityId);

    //lets see if it works on front end!!
    if (
      routine &&
      routine.creatorId === user.id &&
      activity &&
      activity.creatorId === user.id
    ) {
      next();
    } else {
      res.status(403).json({
        message: "You are not the owner of the resource.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = { verifyToken, requireOwner };
