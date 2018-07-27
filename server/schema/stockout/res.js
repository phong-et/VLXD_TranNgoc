import {stockout} from '../../models'
import {product} from '../../models'
import {_auth} from '../../util'
const resolvers = {
  RootQuery: {
    async listStockOut(_, __, {authUser}) {
      _auth(authUser)
      return await 
      stockout.findAll(
        {
          include: [
            {
              model: product,
              required: true,
            },
          ],
        }
      ).then((stockout) =>{
        return stockout.map((listStockOut)=>{
          const productName = listStockOut.getProduct().get('name')
          return Object.assign(listStockOut.get(),{
            productName:productName
          })
        })
      })
    },
  },
  RootMutation: {
    async deleteStock(_, {input}, {authUser}) {
      _auth(authUser)
      return await stockout.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
    async updateStock(_, {input}, {authUser}) {
      _auth(authUser)
      return await stockout.upsert(input).then(() => {
        return input
      })
    },
  },
}

export default resolvers
