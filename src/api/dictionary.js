import { axios } from '@/utils/request'

const api = {
  dictionary: '/common/dictionary'
}
export const DictionaryEnum = {
  WATER_TYPE: 'water_type', // 河湖类型
  PROJECT_LEVEL: 'reservoir_project_level', // 工程级别
  RESERVOIR_TYPE: 'reservoir_type', // 水库类型
  FRACTURE_PROPERTY: 'fracture_property', // 断面属性
  FRACTURE_TYPE: 'fracture_type', // 断面类型,
  WATER_TARGET: 'water_target', // 水质级别
  POLLUTION_TYPE: 'pollution_type', // 污染类型
  ATTENTION_LEVEL: 'attention_level', // 省级、市级、区级
  GET_WATER_TYPE: 'get_water_type', // 取水口类型
  GET_WATER_SCALE: 'get_water_scale', // 取水口规模
  GET_WATER_PURPOSE: 'get_water_purpose', // 取水用途
  FUNCTIONAL_LEVEL1: 'functional_level1', // 水功能保护区级别1
  FUNCTIONAL_LEVEL2: 'functional_level2', // 功能区级别2
  CHIEF_LEVEL: 'chief_level', // 河长级别
  EMPLOYEE_TITLE: 'employee_title', // 职位
  DIC_SEWAGE_TYPE: 'sewage_type', // 排口类型
  DIC_SEWAGE_IN_WAY: 'sewage_in_way', // 排水去向
  DIC_SEWAGE_WAY: 'sewage_way' // 排放方式
}
export function getDictionary (type, pid = 0) {
  return axios({
    url: api.dictionary,
    method: 'get',
    params: {
      type: type,
      pid: pid
    }
  })
}
