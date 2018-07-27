'use strict'
module.exports = (sequelize, DataTypes) => {
  var Stock = sequelize.define(
    'stock',
    {
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.FLOAT,
    },
    {}
  )
  Stock.associate = function(models) {
    // associations can be defined here
    Stock.belongsTo(models.product);
  }
  return Stock
}
