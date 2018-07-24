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
                  v-model="selectedProduct"
                  :options="getRecsStock.map(opt => ({label: opt.productName, value: opt.productId }))"
                />
            </div>
            <div class="col-xs-12 col-md-2">
              <q-input type="number" v-model="quantity" stack-label="Số lượng còn" />
            </div>
            <div class="col-xs-12 col-md-2">
                <q-field :error="isLimitedQuantity" error-label="Số lượng xuất vượt mức kho">
                  <q-input type="number" v-model="quantityOut" stack-label="Số lượng xuất" color="amber"  />
                </q-field>
            </div>
             <div class="col-md-1">
                <q-btn color="green">
                    <q-icon name="add" size="25px"/>
                    <q-spinner-pie slot="loading" size="25px"/>
                </q-btn>
            </div>
          </div>
        </div>
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
      selectedProduct: '',
      quantity: 0,
      quantityOut: 0,
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
  },
}
</script>

<style>
</style>
