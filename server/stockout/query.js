import {GraphQLList} from 'graphql'
import db from '../db'
import {StockOut} from './type'

export default {
  listStockOut: {
    description: `List all StockOuts ###
    {
      listStockOut {
        id
        name
        taxcode
        address
        phone
      }
    }`,
    type: new GraphQLList(StockOut),
    resolve() {
      return db.models.stockout.findAll()
    },
  },
}
