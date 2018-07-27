'use strict'
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    'Product',
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      unit: DataTypes.STRING,
      listingPrice: DataTypes.INTEGER,
    },
    {}
  )
  Product.associate = function(models) {
    // associations can be defined here
    // Product.hasMany(models.stock);
    // Product.hasMany(models.stockout);
  }
  return Product
}
