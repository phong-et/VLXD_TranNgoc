import {GraphQLList} from 'graphql'
import db from '../db'
import {Stock} from './type'

export default {
  listStock: {
    description: `List all StockOuts ###
    {
      listStock {
        id
        productId
        price
        quantity
      }
    }`,
    type: new GraphQLList(Stock),
    resolve() {
      return db.models.stock.findAll({
        include: [{
          model: models.product,
          required: true,
          attributes: [["name", "productName"]]
        }]
      })
    },
  },
}
