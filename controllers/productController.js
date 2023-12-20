const { uuid: uuid4 } = require("uuidv4");
const slugify = require("slugify");
const { Op } = require("sequelize");
const fs = require("fs");
const db = require("../models");
const Product = db.products;
const Variant = db.variants;

exports.addProduct = async (req, res) => {
  try {
    const product = req.body;
    const imageUrl = req?.file?.filename ? req.file.filename : "";
    const id = uuid4();
    const variantsParse = JSON.parse(product?.variants);

    const productInfo = {
      id,
      ...product,
      slug: slugify(product.title) + "-" + Date.now(),
      image: imageUrl,
      variants: variantsParse,
    };

    const result = await Product.create(productInfo, { include: [Variant] });

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

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, { include: [Variant] });

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getSingleProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findByPk(slug, { include: [Variant] });

    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== "") {
      query.category = category;
    }

    const products = await Product.findAll({
      where: query,
      include: [Variant],
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = req.body;
    const newImage = req.file?.filename;
    const variantsParse =
      productInfo?.variants && JSON.parse(productInfo?.variants);

    const product = await Product.findOne({ where: { id: id } });
    const productImage = product?.image;

    if (!product) {
      return res.status(400).json({
        status: false,
        message: "product not found",
      });
    }

    if (newImage && productImage) {
      fs.unlinkSync("upload/images/products/" + productImage);
    }

    if (variantsParse) {
      for (const variant of variantsParse) {
        const { size, colorName, colorCode, quantity } = variant;
        const productVariant = await Variant.findOne({
          where: {
            productId: id,
            size,
            colorName,
          },
        });

        if (!productVariant) {
          await product.createProductVariant({
            size,
            colorName,
            colorCode,
            quantity,
          });
        } else {
          productVariant.quantity = quantity;
          await productVariant.save();
        }
      }
    }

    if (newImage) {
      await Product.update(
        { ...productInfo, image: newImage },
        { where: { id: id } }
      );
      res.status(200).json({
        success: true,
        message: "Update success",
      });
    } else {
      await Product.update(
        { ...productInfo, image: productImage },
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
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id: id } });
    const productImage = product?.image;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product not found",
      });
    }

    const variants = await Variant.findAll({
      where: { productId: id },
    });

    for (const variant of variants) {
      await Variant.destroy({ where: { productId: variant.productId } });
    }

    await Product.destroy({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "Delete success",
    });

    if (productImage) {
      fs.unlinkSync("upload/images/products/" + productImage);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFlashProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      limit: 5,
      where: {
        discount: {
          [Op.gte]: 10,
        },
      },
    });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
