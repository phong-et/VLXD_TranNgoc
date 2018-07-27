import {stock} from '../../models'
import {product} from '../../models'
import {_auth} from '../../util'
const resolvers = {
  RootQuery: {
    async listStock(_, __, {authUser}) {
      _auth(authUser)
      return await 
      // import {sequelize} from '../../models'
      // sequelize.query("SELECT * FROM stocks, products WHERE stocks.productId = products.id", { type: sequelize.QueryTypes.SELECT})
      // .then(stocks => {
      //   // We don't need spread here, since only the results will be returned for select queries
      //   return stocks
      // })
      stock.findAll(
        {
          include: [
            {
              model: product,
              required: true,
              // attributes: [['name', 'productname']],
            },
          ],
        }
      ).then((stock) =>{
        return stock.map((listStock)=>{
          const productName = listStock.getProduct().get('name')
          return Object.assign(listStock.get(),{
            productName:productName
          })
        })
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
