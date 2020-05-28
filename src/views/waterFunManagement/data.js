// 级别类型树结构
export const options = [
  {
    value: '保护区',
    label: '保护区'
  },
  {
    value: '保留区',
    label: '保留区'
  },
  {
    value: '开发利用区',
    label: '开发利用区',
    children: [
      {
        value: '饮用水源区',
        label: '饮用水源区'
      },
      {
        value: '工业用水区',
        label: '工业用水区'
      },
      {
        value: '农业用水区',
        label: '农业用水区'
      },
      {
        value: '渔业用水区',
        label: '渔业用水区'
      },
      {
        value: '景观娱乐用水区',
        label: '景观娱乐用水区'
      },
      {
        value: '过渡区',
        label: '过渡区'
      },
      {
        value: '排污控制区',
        label: '排污控制区'
      }
    ]
  },
  {
    value: '缓冲区',
    label: '缓冲区'
  }
]
