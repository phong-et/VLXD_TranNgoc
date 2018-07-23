import _404 from 'pages/404'
import defaultLayout from 'layouts/default'
import pgProducts from 'pages/products'
import pgSuppliers from 'pages/suppliers'
import pgStock from 'pages/stock'
import pgStockOut from 'pages/stockout'
export default [
  {
    path: '/',
    component: defaultLayout,
    children: [
      {
        path: 'products',
        component: pgProducts,
      },
      {
        path: 'suppliers',
        component: pgSuppliers,
      },
      {
        path: 'stock',
        component: pgStock,
      },
      {
        path: 'stockout',
        component: pgStockOut,
      },
    ],
  },

  {
    // Always leave this as last one
    path: '*',
    component: _404,
  },
]
