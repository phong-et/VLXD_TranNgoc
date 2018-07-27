'use strict'
module.exports = (sequelize, DataTypes) => {
  var Stock = sequelize.define(
    'Stock',
    {
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.FLOAT,
    },
    {}
  )
  Stock.associate = function(models) {
    // associations can be defined here
    Stock.belongsTo(models.Product, {
      foreignKey: 'productId',
    })
  }
  return Stock
}
