const fs = require("fs");
const db = require("../models");
const About = db.about;

exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findOne({ where: { id: 1 } });
    if (!about) {
      return res.status(400).json({
        success: false,
        message: "about not found",
      });
    }

    const newAboutImage = req?.file?.filename;

    if (newAboutImage) {
      await About.update(
        {
          description: req.body.description,
          image: newAboutImage,
        },
        { where: { id: 1 } }
      );
      res.status(200).json({
        success: true,
        message: "Update success",
      });
    } else {
      await About.update(
        {
          description: req.body.description,
          image: about.image,
        },
        { where: { id: 1 } }
      );
      res.status(200).json({
        success: true,
        message: "Update success",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne({ where: { id: 1 } });
    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
