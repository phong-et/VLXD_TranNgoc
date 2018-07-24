import {GraphQLObjectType, GraphQLInputObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLNonNull} from 'graphql'

export const Stock = new GraphQLObjectType({
  name: 'Stock',
  description: 'Stock Information ...',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        description: 'auto-gen id from Sequelize.',
        resolve(stock) {
          return stock.id
        },
      },
      productId: {
        type: GraphQLInt,
        description: 'ProductId',
        resolve(stock) {
          return stock.productId
        },
      },
      productName: {
        type: GraphQLString,
        resolve(stock) {
          return stock.product.get('productname')
        },
      },
      price: {
        type: GraphQLInt,
        description: 'price',
        resolve(stock) {
          return stock.price
        },
      },
      quantity: {
        type: GraphQLFloat,
        resolve(stock) {
          return stock.quantity
        },
      },
    }
  },
})

export const StockInput = new GraphQLInputObjectType({
  name: 'StockInput',
  description: 'This is the Input for StockOut type',
  fields: () => ({
    id: {
      // no need for GraphQLNonNull wrap, coz this Input's id is used in upsert later
      type: GraphQLInt,
    },
    productId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
})
