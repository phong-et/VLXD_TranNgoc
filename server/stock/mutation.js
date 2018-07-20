import {GraphQLInt, GraphQLList} from 'graphql'
import db from '../db'
import Sequelize from 'sequelize'
import {Stock, StockInput} from './type'
const Op = Sequelize.Op

export default {
  deleteStock: {
    type: GraphQLInt,
    args: {
      input: {
        type: new GraphQLList(GraphQLInt),
      },
    },
    resolve(_, {input}) {
      return db.models.stock.destroy({
        where: {
          id: {
            [Op.in]: input,
          },
        },
      })
    },
  },
  updateStock: {
    type: Stock,
    args: {
      input: {
        type: StockInput,
      },
    },
    resolve(_, {input}) {
      return db.models.stock.upsert(input).then(() => {
        return input
      })
    },
  },
}
