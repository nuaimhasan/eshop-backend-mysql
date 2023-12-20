module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contact",
    {
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      facebookLink: {
        type: DataTypes.STRING,
      },
      instagramLink: {
        type: DataTypes.STRING,
      },
      youtubeLink: {
        type: DataTypes.STRING,
      },
      linkedinLink: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  return Contact;
};
