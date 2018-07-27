'use strict'
module.exports = (sequelize, DataTypes) => {
  var StockOut = sequelize.define(
    'stockout',
    {
      quantity: DataTypes.FLOAT,
    },
    {}
  )
  StockOut.associate = function(models) {
    // associations can be defined here
    StockOut.belongsTo(models.product);
  }
  return StockOut
}