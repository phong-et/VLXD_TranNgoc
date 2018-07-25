import {Stock} from '../../models'
import {Product} from '../../models'
import {_auth} from '../../util'

const resolvers = {
  RootQuery: {
    async listStock(_, __, {authUser}) {
      _auth(authUser)
      return await Stock.findAll({
        include: [
          {
            model: Product,
            required: true,
            attributes: [['name', 'productName']],
          },
        ],
      })
    },
  },
  RootMutation: {
    async deleteStock(_, {input}, {authUser}) {
      _auth(authUser)
      return await Stock.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
    async updateStock(_, {input}, {authUser}) {
      _auth(authUser)
      return await Stock.upsert(input).then(() => {
        return input
      })
    },
  },
}

export default resolvers
