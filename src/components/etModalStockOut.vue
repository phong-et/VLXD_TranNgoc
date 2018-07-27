<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="isModalOpened" :content-css="{minWidth:'75vw', minHeight:'80vh'}">
    <q-modal-layout>
        <q-toolbar slot="header" color="tertiary">
          <q-btn
            @click="discardEditingRec"
            icon="keyboard_arrow_left"
            class="q-mr-md"
            :disabled="getIsLoading"
            wait-for-ripple
            color="grey-7"
          />
          <q-btn :loading="getIsLoading" :color="getEditingRec.id?'orange-10':'green'" @click="updateRec">
            <q-icon :name="getEditingRec.id?'save':'add'" size="25px"/>
            <q-spinner-pie slot="loading" size="25px"/>
          </q-btn>
          <q-toolbar-title>
            {{getEditingRec.name}}
          </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <div class="row gutter-x-sm gutter-y-lg" >
            <div class="col-xs-12 col-md-7">
                <q-select filter  stack-label="Sản phẩm" placeholder="Nhập tên sản phẩm cần tìm"
                  @input="selectProduct"
                   v-model="selectedProduct"
                  :options="getRecsStock.map(opt => ({label: opt.productName, value: opt, stamp:opt.quantity.toString()}))"
                />
            </div>
            <div class="col-xs-12 col-md-2">
              <q-input type="number" readonly v-model="quantity" stack-label="SL còn" />
            </div>
            <div class="col-xs-12 col-md-2">
                <q-field :error="isLimitedQuantity" error-label="Số lượng xuất vượt mức kho">
                  <q-input type="number" v-model="quantityOut" stack-label="SL xuất" color="amber"  />
                </q-field>
            </div>
             <div class="col-md-1">
                <q-btn size="s" round dense color="positive" icon="add" @click.native="addProduct(selectedProduct)" class="q-mr-s" />
            </div>
          </div>
        </div>
        <q-table
          :data="stockOutProducts"
          :columns="cols"
          table-class="et-grid"
          dense
          color="purple"
          separator="cell"
          class="layout-padding"
        >
          <!-- slot name syntax: body-cell-<column_name> -->
          <q-td slot="body-cell-productId" auto-width slot-scope="props" :props="props">
             <q-btn size="sm" round dense color="negative" icon="remove" @click="deleteProduct(props.row, true)" class="q-mr-xs" />
          </q-td>

        </q-table>
      </q-modal-layout>
    </q-modal>
  </template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
import _d from 'lodash'
export default {
  props: {
    type: {
      default: 'xxx',
      type: String,
    },
  },
  data() {
    return {
      selectedProduct: {},
      stockOutProducts: [],
      quantity: 0,
      quantityOut: 0,
      // grid stockout product
      cols: [
        {
          name: 'productName',
          label: 'Tên Sản Phẩm',
          align: 'left',
          field: 'productName',
          sortable: true,
        },
        {
          name: 'quantityOut',
          label: 'Số lượng',
          align: 'left',
          field: 'quantityOut',
          sortable: true,
        },
        {
          name: 'productId',
          label: 'Xóa',
          align: 'left',
          field: 'productId',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    // ...mapGetters('product', ['getFields', 'getEditingRec']),
    ...mapGetters('stock', {getRecsStock: 'getRecs'}),
    ...mapState({
      getIsLoading(state, getters) {
        return getters[this.type + '/getIsLoading']
      },
      getFields(state, getters) {
        return getters[this.type + '/getFields']
      },
      getEditingRec(state, getters) {
        return getters[this.type + '/getEditingRec']
      },
      isLimitedQuantity() {
        return this.quantityOut > this.quantity
      },
    }),
    isModalOpened: {
      get() {
        return this.$store.getters[this.type + '/getIsModalOpened']
      },
      set(val) {
        this.$store.commit(this.type + '/setIsModalOpened', val)
      },
    },
  },
  methods: {
    ...mapActions({
      updateRec(dispatch, payload) {
        return dispatch(this.type + '/updateRec', payload)
      },
    }),
    ...mapMutations({
      discardEditingRec(dispatch, payload) {
        return dispatch(this.type + '/discardEditingRec', payload)
      },
    }),
    selectProduct(val) {
      this.quantity = val.quantity
    },
    deleteProduct(product, isRehabilitatedQuantity) {
      var stockOutProducts = this.stockOutProducts
      if (isRehabilitatedQuantity) {
        // adjust quantity on layout when delete same selected product
        if (product.productId === this.selectedProduct.productId) {
          this.quantity = this.quantity + product.quantityOut
        }
        // adjust quantiy on store when delete product on grid (StockOutProduct)
        var indexProduct = this.isExistInStock(product)
        var stock = this.$store.getters['stock' + '/getRecs']
        if (indexProduct > -1) {
          stock[indexProduct].quantity = stock[indexProduct].quantity + product.quantityOut
          this.$store.commit('stock' + '/setRecs', _d.clone(stock))
        }
      }
      // delete product on gird ( StockOutProduct)
      stockOutProducts.splice(stockOutProducts.findIndex(p => p.productId === product.productId), 1)
    },

    isExist(product) {
      return this.stockOutProducts.findIndex(p => p.productId === product.productId)
    },

    isExistInStock(product) {
      var stock = this.$store.getters['stock' + '/getRecs']
      return stock.findIndex(p => p.productId === product.productId)
    },

    addProduct(product) {
      if (product !== {} && this.quantityOut > 0 && this.quantityOut <= this.quantity) {
        product.quantityOut = this.quantityOut
        var index = this.isExist(product)
        // add new product on gird
        if (index === -1) {
          this.stockOutProducts.push(product)
        } else {
          // update quantity product on gird
          product.quantityOut = this.stockOutProducts[index].quantityOut + this.quantityOut
          this.deleteProduct(product)
          this.stockOutProducts.push(_d.clone(product))
        }
        this.quantity = this.quantity - this.quantityOut
        // update quantity in stock(dropdownlist)
        var indexProduct = this.isExistInStock(product)
        var stock = this.$store.getters['stock' + '/getRecs']
        if (indexProduct > -1) {
          stock[indexProduct].quantity = this.quantity
          this.$store.commit('stock' + '/setRecs', _d.clone(stock))
        }
      }
    },
  },
}
</script>

<style>
</style>
