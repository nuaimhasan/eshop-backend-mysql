const db = require("../models");
const Categories = db.categories;
const fs = require("fs");
const slugify = require("slugify");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const icon = req?.file?.filename ? req.file.filename : "";
    const id = Date.now();
    const category = {
      name,
      icon,
      id,
      slug: slugify(name),
    };

    const categories = await Categories.findAll({});
    if (categories?.length === 10) {
      return res.status(400).json({
        success: false,
        message: "can not add more 10 category",
      });
    }

    const result = await Categories.create(category);

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

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.findAll({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({ where: { id: id } });
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const icon = req.file?.filename;

    const category = await Categories.findByPk(id);
    const categoryIcon = category?.icon;

    if (icon && categoryIcon) {
      fs.unlinkSync("upload/images/categories/" + categoryIcon);
    }

    if (icon) {
      await Categories.update(
        { name, slug: slugify(name), icon },
        { where: { id: id } }
      );
      res.status(200).json({
        success: true,
        message: "Update success",
      });
    } else {
      await Categories.update(
        { name, slug: slugify(name), icon: categoryIcon },
        { where: { id: id } }
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findByPk(id);
    const categoryIcon = category?.icon;

    if (category?.id) {
      fs.unlinkSync("upload/images/categories/" + categoryIcon);
      await Categories.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        success: true,
        message: "Delete success",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
