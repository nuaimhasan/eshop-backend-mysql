const db = require("../models");
const Contact = db.contact;

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({ where: { id: id } });
    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "contact not found",
      });
    }

    await Contact.update(req.body, { where: { id: id } });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getContact = async (req, res) => {
  const contact = await Contact.findOne({ where: { id: 1 } });
  res.status(200).json({
    success: true,
    data: contact,
  });
  try {
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
