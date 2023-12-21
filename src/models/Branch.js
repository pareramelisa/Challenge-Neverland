const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Branch",
    {
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      openHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closeHour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      coordinateX: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      coordinateY: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
