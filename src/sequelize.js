const Sequelize = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la DB establecida exitosamente.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Booking, Branch, User } = sequelize.models;

User.belongsToMany(Booking, { through: "user_booking" });
Booking.belongsToMany(User, { through: "user_booking" });
Booking.belongsToMany(Branch, { through: "branch_booking" });
Branch.belongsToMany(Booking, { through: "branch_booking" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
