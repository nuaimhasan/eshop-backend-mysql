module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "color",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Color;
};
