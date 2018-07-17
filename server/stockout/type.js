import {GraphQLObjectType, GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLNonNull} from 'graphql'
export const StockOut = new GraphQLObjectType({
  name: 'StockOut',
  description: 'StockOut Information ...',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        description: 'auto-gen id from Sequelize.',
        resolve(stockout) {
          return stockout.id
        },
      },
      stockId: {
        type: GraphQLInt,
        description: 'StockId show product, price and quantity in inventory(stock).',
        resolve(stockout) {
          return stockout.stockId
        },
      },
      quantity: {
        type: GraphQLString,
        resolve(stockout) {
          return stockout.quantity
        },
      },
    }
  },
})

export const StockOutInput = new GraphQLInputObjectType({
  name: 'StockOutInput',
  description: 'This is the Input for StockOut type',
  fields: () => ({
    id: {
      // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
      type: GraphQLInt,
    },
    stockId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
})
