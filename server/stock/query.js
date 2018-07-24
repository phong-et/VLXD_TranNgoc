import {GraphQLList} from 'graphql'
import db from '../db'
import {Stock} from './type'

const models = db.models
export default {
  listStock: {
    description: `List all StockOuts ###
    {
      listStock {
        id
        productId
        productName
        price
        quantity
      }
    }`,
    type: new GraphQLList(Stock),
    resolve() {
      return db.models.stock.findAll(
        {
          include: [
            {
              model: models.product,
              required: true,
              attributes: [['name', 'productname']],
            },
          ],
        }
      )
      //return db.models.stock.findAll()
    },
  },
}
