const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    { timestamps: false }
  );
};
