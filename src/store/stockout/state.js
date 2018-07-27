export default {
  title: `Thông Tin Phiếu Xuất`,
  isLoading: false,
  isModalOpened: false,
  editingRec: {},
  backupRec: {},
  selected: [],
  recs: [],
  // customize stockout form
  products: [],
  icon: 'store',
  cols: [
    {
      name: 'edit',
      align: 'left',
      field: 'edit',
      width: '34px',
    },
    {
      name: 'id',
      label: 'Mã Phiếu Xuất',
      align: 'left',
      field: 'id',
      sortable: true,
    },
    {
      name: 'productId',
      label: 'Mã sản phẩm',
      align: 'left',
      field: 'productId',
      sortable: true,
    },
    {
      name: 'productName',
      label: 'Tên sản phẩm',
      align: 'left',
      field: 'productName',
      sortable: true,
    },
    {
      name: 'quantity',
      label: 'Số lượng',
      align: 'left',
      field: 'quantity',
      sortable: true,
    },
  ],
  fields: [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'productId',
      label: 'Mã sản phẩm',
      align: 'left',
      field: 'productId',
      sortable: true,
    },
    {
      name: 'productName',
      label: 'Tên sản phẩm',
      align: 'left',
      field: 'productName',
      sortable: true,
    },
    {
      name: 'quantity',
      label: 'Số lượng',
      type: 'text',
      icon: 'import_contacts',
    },
  ],
}
