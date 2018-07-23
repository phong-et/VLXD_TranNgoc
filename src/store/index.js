import Vue from 'vue'
import Vuex from 'vuex'

import product from './product'
import supplier from './supplier'
import stockout from './stockout'
import stock from './stock'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    product,
    supplier,
    stockout,
    stock,
  },
})

export default store
