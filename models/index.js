const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connect success");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);

db.logos = require("./logoModel.js")(sequelize, DataTypes);
db.contact = require("./contactModel.js")(sequelize, DataTypes);
db.banner = require("./bannerModel.js")(sequelize, DataTypes);
db.about = require("./aboutModel.js")(sequelize, DataTypes);

db.products = require("./productModel.js")(sequelize, DataTypes);
db.variants = require("./variantModel.js")(sequelize, DataTypes);
db.categories = require("./categoriesModel.js")(sequelize, DataTypes);
db.colors = require("./colorModel")(sequelize, DataTypes);

db.orders = require("./orderModel.js")(sequelize, DataTypes);
db.order_items = require("./orderItemModel.js")(sequelize, DataTypes);

db.products.hasMany(db.variants);
db.variants.belongsTo(db.products);

db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);
db.order_items.belongsTo(db.users);

db.orders.belongsToMany(db.products, { through: db.order_items });
db.products.belongsToMany(db.orders, { through: db.order_items });

db.sequelize.sync({ force: false });

module.exports = db;
