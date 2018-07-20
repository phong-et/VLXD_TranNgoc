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
      name: 'quantity',
      label: 'Số lượng',
      align: 'left',
      field: 'quantity',
      sortable: true,
    },
    {
      name: 'stockId',
      label: 'Mã Kho',
      align: 'left',
      field: 'stockId',
      sortable: true,
    },
  ],
  fields: [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'stockId',
      label: 'Mã Kho',
      type: 'text',
      icon: 'outlined_flag',
    },
    {
      name: 'quantity',
      label: 'Số lượng',
      type: 'text',
      icon: 'import_contacts',
    },
  ],
}
