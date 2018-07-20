<template>
  <div>
    <et-grid type="stockout"></et-grid>
    <!-- <et-modal type="stockout"></et-modal> -->
    <et-modal-stock-out type="stockout"></et-modal-stock-out>
  </div>
</template>

<style>
</style>

<script>
// eslint-disable-next-line no-unused-vars
import etGrid from '../components/etGrid.vue'
// import etModal from '../components/etModal.vue'
import etModalStockOut from '../components/etModalStockOut.vue'
export default {
  components: {
    etGrid,
    etModalStockOut,
  },
  data() {
    return {}
  },
}
</script>

<style>
</style>
