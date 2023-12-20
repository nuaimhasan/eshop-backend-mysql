const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await db.users.findOne({ where: { phone: decoded.phone } });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }
    if (user.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      error,
    });
  }
};
