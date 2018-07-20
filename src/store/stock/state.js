export default {
  title: `Thông Tin Kho`,
  isLoading: false,
  isModalOpened: false,
  editingRec: {},
  backupRec: {},
  selected: [],
  recs: [],
  icon: 'store',
  cols: [
    {
      name: 'id',
      label: 'Mã Kho',
      align: 'left',
      field: 'id',
      sortable: true,
    },
    {
      name: 'productId',
      label: 'Mã Sản Phẩm',
      align: 'left',
      field: 'productId',
      sortable: true,
    },
    {
      name: 'price',
      label: 'Đơn giá',
      align: 'left',
      field: 'price',
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
      label: 'Mã Sản Phẩm',
      type: 'text',
      icon: 'outlined_flag',
    },
    {
      name: 'price',
      label: 'Đơn Giá',
      type: 'text',
      icon: 'import_contacts',
    },
    {
      name: 'quantity',
      label: 'Số lượng',
      type: 'text',
      icon: 'import_contacts',
    },
  ],
}
