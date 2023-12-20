const { uuid: uuid4 } = require("uuidv4");
const fs = require("fs");
const db = require("../models");
const Banner = db.banner;

exports.addBanner = async (req, res) => {
  try {
    const newBanner = req?.file?.filename;
    if (!newBanner) {
      return res.status(400).json({
        success: false,
        message: "banner image is required",
      });
    }
    const banner = {
      id: Date.now(),
      image: newBanner,
    };

    const result = await Banner.create(banner);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.allBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({});
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findOne({ where: { id: id } });

    if (banner) {
      fs.unlinkSync("upload/images/banners/" + banner.image);

      await Banner.destroy({ where: { id: id } });

      res.status(200).json({
        success: true,
        message: "Delete success",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Banner not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
