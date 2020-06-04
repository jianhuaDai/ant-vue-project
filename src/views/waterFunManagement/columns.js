export const columns = [
  {
    title: '功能区名称',
    dataIndex: 'func_name',
    scopedSlots: { customRender: 'func_name' }
  },
  {
    title: '级别',
    dataIndex: 'func_grade_name'
  },
  {
    title: '类型',
    dataIndex: 'functional_type_name'
  },
  {
    title: '经纬度',
    dataIndex: 'lon_lat'
  },
  {
    title: '是否为考核水功能区',
    dataIndex: 'is_examine'
  },
  {
    title: '水质目标',
    dataIndex: 'water_target_name'
  },
  {
    title: '所属区域',
    dataIndex: 'regionalism_name'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '160px',
    scopedSlots: { customRender: 'action' }
  }
]
