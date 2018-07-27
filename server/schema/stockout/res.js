import {StockOut} from '../../models'
import {Product} from '../../models'
import {_auth} from '../../util'
const resolvers = {
  RootQuery: {
    async listStockOut(_, __, {authUser}) {
      _auth(authUser)
      return await 
      StockOut.findAll(
        {
          include: [
            {
              model: Product,
              required: true,
            },
          ],
        }
      ).then((StockOut) =>{
        return StockOut.map((listStockOut)=>{
          const productName = listStockOut.getProduct().get('name')
          return Object.assign(listStockOut.get(),{
            productName:productName
          })
        })
      })
    },
  },
  RootMutation: {
    async deleteStockOut(_, {input}, {authUser}) {
      _auth(authUser)
      return await StockOut.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
    async updateStock(_, {input}, {authUser}) {
      _auth(authUser)
      return await StockOut.upsert(input).then(() => {
        return input
      })
    },
  },
}

export default resolvers
