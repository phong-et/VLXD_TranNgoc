import Sequelize from 'sequelize'

const Op = Sequelize.Op

// const Conn = new Sequelize('heroku_c53a18f60a793d9', 'b8558b412c7ee2', 'bf3ad615', {
//   host: 'us-cdbr-iron-east-04.cleardb.net',
//   dialect: 'mysql',
//   operatorsAliases: Op,
//   pool: {
//     port: 3306,
//     max: 5,
//     min: 1,
//     accquire: 60000,
//     idle: 20000,
//   },
// })

const Conn = new Sequelize('vlxd', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: Op,
  pool: {
    port: 3306,
    max: 5,
    min: 1,
    accquire: 60000,
    idle: 20000,
  },
})
// eslint-disable-next-line no-unused-vars
const Product = Conn.define('product', {
  code: {type: Sequelize.STRING, allowNull: false},
  name: {type: Sequelize.STRING, allowNull: false},
  unit: {type: Sequelize.STRING, allowNull: true},
  listingPrice: {type: Sequelize.INTEGER, allowNull: true},
})

// eslint-disable-next-line no-unused-vars
const Supplier = Conn.define('supplier', {
  taxcode: {type: Sequelize.STRING, allowNull: false},
  name: {type: Sequelize.STRING, allowNull: false},
  address: {type: Sequelize.STRING, allowNull: true},
  phone: {type: Sequelize.STRING, allowNull: true},
})

const Stock = Conn.define('stock',{
  //productId:{type: Sequelize.INTEGER, allowNull: false},
  price:{type: Sequelize.INTEGER, allowNull: true},
  quantity:{type: Sequelize.INTEGER, allowNull: true},
})

const StockIn = Conn.define('stockin',{
  //productId:{type: Sequelize.INTEGER, allowNull: false},
  //supplierId:{type: Sequelize.INTEGER, allowNull: false},
  price:{type: Sequelize.INTEGER, allowNull: true},
  quantity:{type: Sequelize.INTEGER, allowNull: true},
})

const StockOut = Conn.define('stockout',{
  //stockId:{type: Sequelize.INTEGER, allowNull: false},
  quantity:{type: Sequelize.INTEGER, allowNull: true},
})

Product.hasMany(Stock);
Product.hasMany(StockIn);
Stock.hasMany(StockOut)

Conn.authenticate()
//Conn.sync({force: true})
// Generating demo Data
// import _d from 'lodash'
// import Faker from 'faker'

// Conn.sync({force: true}).then(() => {
//   console.log('DB Structure created ...')
//   _d.times(100, () => {
//     return Product.create({
//       code: Faker.address.countryCode(),
//       name: Faker.commerce.productName(),
//       unit: Faker.commerce.productMaterial(),
//       listingPrice: Faker.commerce.price(),
//     })
//   })

//   console.log('DB Structure created ...')
//   _d.times(100, () => {
//     return Supplier.create({
//       taxcode: Faker.address.countryCode(),
//       name: Faker.commerce.productName(),
//       address: Faker.address.streetAddress(),
//       phone: Faker.phone.phoneNumber(),
//     })
//   })

//   console.log('DB Structure created ...')
//   _d.times(100, () => {
//     return Stock.create({
//       price:Faker.commerce.price(),
//       quantity:Faker.random.number(),
//     })
//   })

//   console.log('DB Structure created ...')
//   _d.times(100, () => {
//     return StockIn.create({
//       price:Faker.commerce.price(),
//       quantity:Faker.random.number(),
//     })
//   })
  
//   console.log('DB Structure created ...')
//   _d.times(100, () => {
//     return StockOut.create({
//       quantity:Faker.random.number(),
//     })
//   })
// })

export default Conn
