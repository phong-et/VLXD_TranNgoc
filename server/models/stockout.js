'use strict'
module.exports = (sequelize, DataTypes) => {
  var StockOut = sequelize.define(
    'StockOut',
    {
      quantity: DataTypes.FLOAT,
    },
    {}
  )
  StockOut.associate = function(models) {
    // associations can be defined here
    StockOut.belongsTo(models.Product, {
      foreignKey: 'productId',
    })
  }
  return StockOut
}
