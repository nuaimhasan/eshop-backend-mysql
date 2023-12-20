const db = require("../models");
const Color = db.colors;

exports.getColors = async (req, res) => {
  try {
    const colors = await Color.findAll({});
    res.status(200).json({
      success: true,
      data: colors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
