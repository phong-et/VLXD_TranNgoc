'use strict'
const _d = require('lodash')
const Faker = require('faker')

var data = []
_d.times(10, () => {
  data.push({
    price: Faker.commerce.price(),
    quantity: Faker.random.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stocks', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stocks', null, {})
  },
}
