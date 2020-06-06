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
  loadWaterOrRain,
  loadPollution,
  loadRiverAndLake,
  loadGetWater,
  loadWaterEmphasiss,
  loadWaterFunction,
  loadSewage, loadRiverLine, loadBlackWater, loadProject, loadVideoMonitor, loadBoard, loadEvent, loadComplaint
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
      icon: '/icons/water.svg'
    }, {
      id: 13,
      name: '雨情',
      icon: '/icons/rain.svg'
    }, {
      id: 14,
      name: '视频监控',
      icon: '/icons/video.svg'
    }],
    2: [{
      id: 21,
      name: '河流'
    }, {
      id: 22,
      name: '湖泊',
      externalLayer: ['lake', 'lakeText']
    }, {
      id: 23,
      name: '水库'
    }],
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
      detailModal: 'GetWaterDetail',
      bgColor: '#516c85',
      detailTitle: '排污口详情'
    }],
    6: [{
      id: 61,
      name: '黑臭水',
      icon: '/icons/black-water.svg'
    }],
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
    rowKey: 'id',
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
    columns: [{
      title: '水量(cm)',
      dataIndex: 'rain_amount',
      width: '40%'
    }, {
      title: '站点名称',
      dataIndex: 'station_name',
      width: '70%'
    }]
  },
  13: {
    rowKey: 'water_rain_id',
    columns: [{
      title: '雨量(mm)',
      dataIndex: 'rain_amount',
      width: '40%'
    }, {
      title: '站点名称',
      dataIndex: 'station_name',
      width: '70%'
    }]
  },
  14: {
    rowKey: 'video_monitor_id',
    columns: [{
      title: '名称',
      dataIndex: 'video_monitor_name',
      width: '50%'
    }, {
      title: '地址',
      dataIndex: 'address',
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
      title: '级别',
      dataIndex: 'func_grade',
      width: '60px'
    }, {
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
      dataIndex: 'come_from',
      scopedSlots: { customRender: 't/a' }
    }]
  },
  61: {
    rowKey: 'monitor_id',
    columns: [{
      title: '河流',
      dataIndex: 'river_name',
      width: '70%'
    }, {
      title: '负责人',
      dataIndex: 'rivers_holder',
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
      title: '名称',
      dataIndex: 'name',
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

export function GetDataByLayer (layerId) {
  switch (layerId) {
    case 11: {
      return loadPollution({
        page_size: 0,
        province_id: 32,
        status: 1
      })
    }
    case 12: {
      return loadWaterOrRain({
        page_size: 0,
        province_id: 32,
        type: 1
      })
    }
    case 13: {
      return loadWaterOrRain({
        page_size: 0,
        province_id: 32,
        type: 2
      })
    }
    case 14: {
      return loadVideoMonitor({
        page_size: 0,
        province_id: 32
      })
    }
    case 21: {
      return loadRiverAndLake({
        page_size: 0,
        province_id: 32,
        water_type: 'river_reach'
      })
    }
    case 22: {
      return loadRiverAndLake({
        page_size: 0,
        province_id: 32,
        water_type: 'lake'
      })
    }
    case 23: {
      return loadRiverAndLake({
        page_size: 0,
        province_id: 32,
        water_type: 'reservoir'
      })
    }
    case 31: {
      return loadGetWater({
        page: 1,
        page_size: 0
      })
    }
    case 32: {
      return loadWaterFunction({
        page_size: 0
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
        province_id: 32,
        status: 1
      })
    }
    case 61: {
      return loadBlackWater({
        page_size: 0,
        province_id: 32
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
        province_id: 32
      }).then(res => {
        return Promise.resolve(res.data)
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
export const LakeLabel = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'id': 1,
        'name': '微山湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          117.22206115722656,
          34.6015631772409
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 2,
        'name': '滆湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          119.82015609741211,
          31.60675591735292
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 3,
        'name': '太湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          120.08743286132811,
          31.238637039097664
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 4,
        'name': '长荡湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          119.54764366149902,
          31.61391934430613
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 5,
        'name': '淀山湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          120.97183227539061,
          31.11614909904615
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 6,
        'name': '骆马湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          118.17898750305176,
          34.10171299732581
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 7,
        'name': '邵伯湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          119.43855285644531,
          32.619135172282014
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 8,
        'name': '高邮湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          119.33486938476561,
          32.84382741262935
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 9,
        'name': '白马湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          119.12956237792969,
          33.22432868739248
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 10,
        'name': '洪泽湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          118.71860504150389,
          33.31618450793617
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 11,
        'name': '石臼湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          118.89198303222656,
          31.472888716536755
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'id': 12,
        'name': '固城湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          118.92494201660156,
          31.27767058910973
        ]
      }
    }, {
      'type': 'Feature',
      'properties': {
        'id': 12,
        'name': '玄武湖'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          118.79229068756102,
          32.07546561710839
        ]
      }
    }
  ]
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
