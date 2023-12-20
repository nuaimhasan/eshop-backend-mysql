module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define(
    "variant",
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Variant;
};
