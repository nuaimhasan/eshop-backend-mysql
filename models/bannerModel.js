module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    "banner",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Banner;
};
