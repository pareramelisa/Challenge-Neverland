const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Booking", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, { timestamps: false }); 
};