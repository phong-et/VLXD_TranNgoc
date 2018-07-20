import {GraphQLList} from 'graphql'
import db from '../db'
import {StockOut} from './type'

export default {
  listStockOut: {
    description: `List all StockOuts ###
    {
      listStockOut {
        id
        stockId
        quantity
      }
    }`,
    type: new GraphQLList(StockOut),
    resolve() {
      return db.models.stockout.findAll()
    },
  },
  listProductsInStock: {
    description: `List all Products In Stocks ###
    {
      listProductsInStock {
        quantity
      }
    }`,
    type: new GraphQLList(StockOut),
    resolve() {
      return db.models.stockout.findAll({
          include: [{
            model: models.product,
            required: true,
            attributes: [["name", "productName"]]
          }]
        })
    },
  },
}
