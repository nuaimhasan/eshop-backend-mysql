const fs = require("fs");
const db = require("../models");
const Logo = db.logos;

exports.updateMainLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findOne({ where: { id: id } });
    if (!logo) {
      return res.status(400).json({
        success: false,
        message: "logo not found",
      });
    }

    const newLogo = req?.file?.filename;
    if (!newLogo) {
      return res.status(400).json({
        success: false,
        message: "logo is required",
      });
    }

    await Logo.update({ logo: newLogo }, { where: { id: id } });
    res.status(200).json({
      success: true,
      message: "Update success",
    });

    const uploadedLogo = logo.logo;
    if (newLogo && logo) {
      fs.unlinkSync("upload/images/logos/" + uploadedLogo);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logos = await Logo.findAll({});
    res.status(200).json({
      success: true,
      data: logos,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMainLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne({ where: { name: "main logo" } });
    res.status(200).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDashboardLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne({ where: { name: "dashboard logo" } });
    res.status(200).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
