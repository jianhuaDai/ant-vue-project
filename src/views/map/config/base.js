import IconMonitor from '@assets/map-icons/monitor.svg?inline'
import IconMonitorSelected from '@assets/map-icons/monitor-selected.svg?inline'
import IconInfo from '@assets/map-icons/info.svg?inline'
import IconInfoSelected from '@assets/map-icons/info-selected.svg?inline'
import IconProtect from '@assets/map-icons/protect.svg?inline'
import IconProtectSelected from '@assets/map-icons/protect-selected.svg?inline'
import IconLine from '@assets/map-icons/line.svg?inline'
import IconLineSelected from '@assets/map-icons/line-selected.svg?inline'
import IconPollution from '@assets/map-icons/water-pollution.svg?inline'
import IconPollutionSelected from '@assets/map-icons/water-pollution-selected.svg?inline'
import IconWater from '@assets/map-icons/water.svg?inline'
import IconWaterSelected from '@assets/map-icons/water-selected.svg?inline'
import IconWaterProject from '@assets/map-icons/water-project.svg?inline'
import IconWaterProjectSelected from '@assets/map-icons/water-project-selected.svg?inline'
import IconChief from '@assets/map-icons/chief.svg?inline'
import IconChiefSelected from '@assets/map-icons/chief-selected.svg?inline'
import {
  loadWFS,
  loadWater,
  loadRain,
  loadPollution,
  loadRiverAndLake,
  loadGetWater,
  loadWaterEmphasiss,
  loadWaterFunction,
  loadWaterPoint,
  loadEcologicalStation,
  loadSewage, loadRiverLine, loadProject, loadVideoMonitor, loadBoard, loadEvent, loadComplaint
} from '@/api/mapServer'
import { PointLayer } from '@antv/l7'

export function Navs () {
  return [{
    id: 1,
    icon: IconMonitor,
    iconSelected: IconMonitorSelected,
    title: '河湖监控'
  }, {
    id: 2,
    icon: IconInfo,
    iconSelected: IconInfoSelected,
    title: '河湖信息'
  }, {
    id: 3,
    icon: IconProtect,
    iconSelected: IconProtectSelected,
    title: '资源保护'
  }, {
    id: 4,
    icon: IconLine,
    iconSelected: IconLineSelected,
    title: '岸线管理'
  }, {
    id: 5,
    icon: IconPollution,
    iconSelected: IconPollutionSelected,
    title: '污染防治'
  }, {
    id: 6,
    icon: IconWater,
    iconSelected: IconWaterSelected,
    title: '环境治理'
  }, {
    id: 7,
    icon: IconWaterProject,
    iconSelected: IconWaterProjectSelected,
    title: '水利工程'
  }, {
    id: 8,
    icon: IconChief,
    iconSelected: IconChiefSelected,
    title: '河长业务'
  }]
}

export function GetLayerItem (id, layerItems) {
  return layerItems.find(v => v.id === id)
}

export function LayerBtns () {
  return {
    1: [{
      id: 11,
      name: '污染源',
      icon: '/icons/pollution.svg',
      bgColor: '#516c85',
      detailModal: 'PollutionDetail',
      detailTitle: '污染源详情'
    }, {
      id: 12,
      name: '水情',
      icon: '/icons/water.svg',
      bgColor: '#2c92d9',
      detailModal: 'waterDetail',
      detailTitle: '水情详情'
    }, {
      id: 13,
      name: '雨情',
      icon: '/icons/rain.svg',
      bgColor: '#13c7ff',
      detailModal: 'rainDetail',
      detailTitle: '雨情详情'
    }, {
      id: 14,
      name: '视频监控',
      bgColor: '#3677fe',
      icon: '/icons/video.svg'
    }],
    2: [{
      id: 21,
      name: '河流'
    },
      {
      id: 22,
      name: '湖泊',
      externalLayer: ['lake', 'lakeText']
    }, {
      id: 23,
      name: '水库'
      }
    ],
    3: [{
      id: 31,
      name: '取水口',
      icon: '/icons/intake.svg',
      bgColor: '#3677fe',
      detailModal: 'GetWaterDetail',
      detailTitle: '取水口详情'
    }, {
      id: 32,
      name: '水功能区',
      icon: '/icons/water-function.svg',
      bgColor: '#1391d9',
      detailModal: 'getWaterFun',
      detailTitle: '水功能区详情'
    }, {
      id: 33,
      name: '水环境功能区',
      icon: '/icons/water-env.svg'
    }],
    4: [{
      id: 41,
      name: '水域岸线'
    }],
    5: [{
      id: 51,
      name: '排污口',
      icon: '/icons/outfall.svg',
      detailModal: 'outFallDetail',
      bgColor: '#516c85',
      detailTitle: '排污口详情'
    }],
    6: [{
        id: 61,
        name: '水源地',
        icon: '/icons/water-point.svg'
      },
      {
        id: 62,
        name: '生态监测站',
        icon: '/icons/ecological-station.svg'
      }
    ],
    7: [{
      id: 71,
      name: '重点工程',
      icon: '/icons/project.svg'
    }],
    8: [{
      id: 81,
      name: '河长公示牌',
      icon: '/icons/board.svg'
    }, {
      id: 82,
      name: '事件告警',
      icon: '/icons/event.svg'
    }, {
      id: 83,
      name: '公众投诉',
      icon: '/icons/complaint.svg'
    }]
  }
}

const TableColumns = {
  11: {
    rowKey: 'pollution_id',
    columns: [{
      title: '污染源',
      dataIndex: 'pollution_name',
      width: '50%'
    }, {
      title: '地址',
      dataIndex: 'location',
      width: '50%'
    }]
  },
  12: {
    rowKey: 'water_rain_id',
    columns: [
      {
        title: '站点名称',
        dataIndex: 'station_name'
      },
      {
        title: '上游水位(m)',
        dataIndex: 'up_value',
        scopedSlots: { customRender: 'up_value' }
      },
      {
        title: '下游水位(m)',
        dataIndex: 'down_value',
        scopedSlots: { customRender: 'down_value' }
      }
    ]
  },
  13: {
    rowKey: 'water_rain_id',
    columns: [
      {
        title: '站点名称',
        dataIndex: 'station_name',
        width: '70%'
      },
      {
        title: '雨量(mm)',
        dataIndex: 'value',
        width: '40%',
        scopedSlots: { customRender: 'value' }
      }
    ]
  },
  14: {
    rowKey: 'video_monitor_id',
    columns: [{
      title: '站点名称',
      dataIndex: 'station_name',
      width: '50%'
    }, {
      title: '地址',
      dataIndex: 'location',
      width: '50%'
    }]
  },
  21: {
    rowKey: 'water_id',
    columns: [{
      title: '名称',
      dataIndex: 'name',
      width: 120
    }, {
      title: '负责人',
      dataIndex: 'leader',
      width: 80
    }, {
      title: '长度(m)',
      dataIndex: 'length',
      width: 100
    }]
  },
  22: {
    rowKey: 'water_id',
    columns: [{
      title: '名称',
      dataIndex: 'name',
      width: '70%'
    }, {
      title: '负责人',
      dataIndex: 'leader',
      width: '30%'
    }]
  },
  23: {
    rowKey: 'water_id',
    columns: [{
      title: '名称',
      dataIndex: 'name',
      width: '70%'
    }, {
      title: '负责人',
      dataIndex: 'leader',
      width: '30%'
    }]
  },
  31: {
    rowKey: 'get_water_id',
    columns: [{
      title: '名称',
      dataIndex: 'name',
      width: '70%'
    }, {
      title: '取水量',
      dataIndex: 'ammount',
      width: '30%',
      scopedSlots: { customRender: 'm3s' }
    }]
  },
  32: {
    rowKey: 'func_id',
    columns: [{
      title: '功能分类',
      dataIndex: 'functional_type_name',
      width: '120px'
    }, {
      title: '名称',
      dataIndex: 'func_name',
      width: '120px'
    }]
  },
  33: {
    rowKey: 'water_id',
    columns: [{
      title: '监测站',
      dataIndex: 'station_name',
      width: '50%'
    }, {
      title: '达标情况',
      dataIndex: 'remark',
      width: '50%'
    }]
  },
  41: {
    rowKey: 'id',
    columns: [{
      title: '名称',
      dataIndex: 'line_name',
      width: '50%'
    }, {
      title: '管理单位',
      dataIndex: 'management_unit',
      width: '50%'
    }]
  },
  51: {
    rowKey: 'sewage_id',
    columns: [{
      title: '排污口',
      dataIndex: 'sewage_name'
    }, {
      title: '监控视频',
      dataIndex: 'has_video',
      width: '100px',
      scopedSlots: { customRender: 'hasOrNo' }
    }, {
      title: '排污量',
      dataIndex: 'in_river',
      scopedSlots: { customRender: 'in_river' }
    }]
  },
  61: {
    rowKey: 'monitor_id',
    columns: [{
      title: '水源地名称',
      dataIndex: 'name',
      width: '60%'
    }, {
      title: '测站类型',
      dataIndex: 'station_type_name',
      width: '30%'
    }]
  },
  62: {
    rowKey: 'ecological_id',
    columns: [{
      title: '测站名称',
      dataIndex: 'station_name',
      width: '60%'
    }, {
      title: '测站类型',
      dataIndex: 'station_type_name',
      width: '30%'
    }]
  },
  71: {
    rowKey: 'id',
    columns: [{
      title: '项目名称',
      dataIndex: 'project',
      width: '60%'
    }, {
      title: '时间',
      dataIndex: 'time',
      width: '40%'
    }]
  },
  81: {
    rowKey: 'id',
    columns: [{
      title: '公示牌编码',
      dataIndex: 'billboard_num',
      width: '100'
    }]
  },
  82: {
    rowKey: 'id',
    columns: [{
      title: '事件',
      dataIndex: 'name',
      width: '100'
    }]
  },
  83: {
    rowKey: 'id',
    columns: [{
      title: '投诉内容',
      dataIndex: 'name',
      width: '100'
    }]
  }
}

export function GetTableRowKey (layerId) {
  return TableColumns[layerId] && TableColumns[layerId].rowKey ? TableColumns[layerId].rowKey : 'id'
}

export function TableColumnsByLayer (layerId) {
  return TableColumns[layerId] && TableColumns[layerId].columns ? TableColumns[layerId].columns : []
}
// 第一个参数传id，第二个参数传Object作为查询接口请求参数
export function GetDataByLayer () {
  const layerId = arguments[0] ? arguments[0] : ''
  const params = arguments[1] ? arguments[1] : {}
  switch (layerId) {
    case 11: {
      return loadPollution({
        page_size: 0,
        province_id: 32,
        status: 1,
        ...params
      })
    }
    case 12: {
      // 水情列表
      return loadWater({
        page_size: 0,
        station_type: 1,
        ...params
      })
    }
    case 13: {
      // 雨情列表
      return loadRain({
        start_time: '2020-06-10 00:00:00',
        page_size: 0,
        end_time: '2020-06-10 18:00:00',
        station_name: '',
        ...params
      })
    }
    case 14: {
      return loadVideoMonitor({
        page_size: 0,
        station_type: 5,
        regionalism_id: '',
        water_type: null,
        ...params
      })
    }
    case 21: {
      return loadRiverAndLake({
        page_size: 0,
        water_type: 1,
        ...params
      })
    }
    case 22: {
      return loadRiverAndLake({
        page_size: 0,
        water_type: 3,
        ...params
      })
    }
    case 23: {
      return loadRiverAndLake({
        page_size: 0,
        water_type: 5,
        ...params
      })
    }
    case 31: {
      return loadGetWater({
        page: 1,
        page_size: 10,
        ...params
      })
    }
    case 32: {
      return loadWaterFunction({
        page_size: 0,
        ...params
      })
    }
    case 33: {
      return loadWaterEmphasiss({
        page_size: 0,
        province_id: 32
      })
    }
    case 41: {
      return loadRiverLine({
        page_size: 0,
        province_id: 32
      })
    }
    case 51: {
      return loadSewage({
        page_size: 0,
        ...params
      })
    }
    case 61: {
      return loadWaterPoint({
        page_size: 0,
        ...params
      })
    }
    case 62: {
      return loadEcologicalStation({
        page_size: 0,
        station_type: 4,
        ...params
      })
    }
    case 71: {
      return loadProject({
        page_size: 0,
        province_id: 32
      }).then(res => {
        return Promise.resolve(res.data)
      })
    }
    case 81: {
      return loadBoard({
        page_size: 0,
        ...params
      })
    }
    case 82: {
      return loadEvent({
        page_size: 0,
        province_id: 32
      }).then(res => {
        return Promise.resolve(res.data)
      })
    }
    case 83: {
      return loadComplaint({
        page_size: 0,
        province_id: 32
      }).then(res => {
        return Promise.resolve(res.data)
      })
    }
    default: {
      return new Promise((resolve, reject) => {
          resolve(false)
      })
    }
  }
}

// 河湖库类型
export const RiverType = {
  River: 1,
  RiverSegment: 2,
  Lake: 3,
  LakeSegment: 4,
  Dam: 5,
  DamSegment: 6
}

export function buildGeoJSON (coordinates, type = 'Polygon', properties = {}) {
  return {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': properties,
        'geometry': {
          'type': type,
          'coordinates': coordinates
        }
      }
    ]
  }
}
