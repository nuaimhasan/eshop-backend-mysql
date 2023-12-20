module.exports = (sequelize, DataTypes) => {
  const About = sequelize.define(
    "about",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return About;
};
