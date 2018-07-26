const Stock = `
  type Stock {
    id: Int
    productId: Int
    productName: String
    price: Int
    quantity: Float
  }
  input StockInput {
    id: Int
    productId: Int
    productName: String
    price: Int
    quantity: Float
  }
`
export default Stock