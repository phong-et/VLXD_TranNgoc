const StockOut = `
  type StockOut {
    id: Int
    productId: Int
    productName: String
    quantity: Float
  }
  input StockOutInput {
    id: Int
    productId: Int
    quantity: Float
  }
`
export default StockOut