import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import qryProduct from './product/query'
import mutProduct from './product/mutation'

import qrySupplier from './supplier/query'
import mutSupplier from './supplier/mutation'

import qryStockOut from './stockout/query'
import mutStockOut from './stockout/mutation'

import qryStock from './stock/query'
import mutStock from './stock/mutation'

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the ROOT Query',
  fields: () => {
    return {
      ...qryProduct,
      ...qrySupplier,
      ...qryStockOut,
      ...qryStock,
    }
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is for create/update/delete operation',
  fields() {
    return {
      ...mutProduct,
      ...mutSupplier,
      ...mutStockOut,
      ...mutStock,
    }
  },
})

const SCHEMA = new GraphQLSchema({
  query,
  mutation,
})

export default SCHEMA
