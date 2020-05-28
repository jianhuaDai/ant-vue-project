export const columns = [
  {
    title: '功能区名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '级别',
    dataIndex: 'site'
  },
  {
    title: '类型',
    dataIndex: 'principal'
  },
  {
    title: '经纬度',
    dataIndex: 'create_at'
  },
  {
    title: '是否为考核水功能区',
    dataIndex: 'a1'
  },
  {
    title: '水质目标',
    dataIndex: 'a2'
  },
  {
    title: '所属区域',
    dataIndex: 'a3'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '160px',
    scopedSlots: { customRender: 'action' }
  }
]
