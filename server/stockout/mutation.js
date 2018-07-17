import {GraphQLInt, GraphQLList} from 'graphql'
import db from '../db'
import Sequelize from 'sequelize'
import {StockOut, StockOutInput} from './type'
const Op = Sequelize.Op

export default {
  deleteStockOut: {
    type: GraphQLInt,
    args: {
      input: {
        type: new GraphQLList(GraphQLInt),
      },
    },
    resolve(_, {input}) {
      return db.models.stockout.destroy({
        where: {
          id: {
            [Op.in]: input,
          },
        },
      })
    },
  },
  updateStockOut: {
    type: StockOut,
    args: {
      input: {
        type: StockOutInput,
      },
    },
    resolve(_, {input}) {
      return db.models.stockout.upsert(input).then(() => {
        return input
      })
    },
  },
}
