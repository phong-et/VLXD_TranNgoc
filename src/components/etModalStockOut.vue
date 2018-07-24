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
              <q-input type="number" v-model="quantity" stack-label="SL còn" />
            </div>
            <div class="col-xs-12 col-md-2">
                <q-field :error="isLimitedQuantity" error-label="Số lượng xuất vượt mức kho">
                  <q-input type="number" v-model="quantityOut" stack-label="SL xuất" color="amber"  />
                </q-field>
            </div>
             <div class="col-md-1">
                <q-btn color="green">
                    <q-icon @click.native="addProduct(selectedProduct)" name="add" size="25px"/>
                    <q-spinner-pie slot="loading" size="25px"/>
                </q-btn>
            </div>
          </div>
        </div>
        <q-table
          :data="stockOutProduct"
          :columns="cols"
          table-class="et-grid"
          dense
          color="purple"
          separator="cell"
          class="layout-padding"
        >
          <!-- slot name syntax: body-cell-<column_name> -->
          <q-td slot="body-cell-productId" auto-width slot-scope="props" :props="props">
             <q-btn size="sm" round dense color="negative" icon="remove" @click="deleteProduct(props.row.productId)" class="q-mr-xs" />
          </q-td>

        </q-table>
      </q-modal-layout>
    </q-modal>
  </template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
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
      stockOutProduct: [],
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
    deleteProduct(productId) {
      var stockOutProduct = this.stockOutProduct
      // stockOutProduct = stockOutProduct.filter(function(product) {
      //   return product.productId !== productId
      // })
      stockOutProduct.splice(stockOutProduct.findIndex(product => product.productId === productId), 1)
    },
    isExist(product) {
      // return this.stockOutProduct.find(function(p) {
      //   return p.productId === product.productId
      // })
      return this.stockOutProduct.findIndex(p => p.productId === product.productId)
    },
    addProduct(product) {
      if (product !== {} && this.quantityOut > 0 && this.quantityOut <= this.quantity) {
        product.quantityOut = this.quantityOut
        var index = this.isExist(product)
        if (index === -1) {
          this.stockOutProduct.push(product)
        } else {
          product.quantityOut += this.stockOutProduct[index].quantityOut
          this.deleteProduct(product.productId)
          this.stockOutProduct.push(product)
        }
      }
    },
  },
}
</script>

<style>
</style>
