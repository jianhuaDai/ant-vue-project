// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView, MaskPageView } from '@/layouts'
import {
  home, homeSelected, infoManage, infoManageSelected, infoService, infoServiceSelected, map, mapSelected, travel,
  travelSelected, event, eventSelected, check, checkSelected, kpi, kpiSelected, office, officeSelected, analysis, analysisSelected, board, boardSelected
} from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '工作首页' },
    redirect: '/home',
    children: [
      // dashboard
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: { title: '工作首页', keepAlive: true, icon: home, hiddenBread: true, iconSelected: homeSelected, permission: ['dashboard'] }
      },
      // 一张图
      {
        path: '/map',
        name: 'MapIndex',
        component: () => import('@/views/map/OneMap'),
        meta: { title: '一张图', icon: map, iconSelected: mapSelected, hiddenBread: true, hideHeader: true, permission: ['dashboard'], hiddenHeaderContent: true }
      },
      // // 一张图
      // {
      //   path: '/map2',
      //   name: 'MapIndex2',
      //   component: () => import('@/views/map/MapDemo'),
      //   meta: { title: '一张图2', icon: map, iconSelected: mapSelected, hiddenBread: true, hideHeader: true, permission: ['dashboard'], hiddenHeaderContent: true }
      // },
      // 信息管理
      {
        path: '/info-manage',
        redirect: '/info-manage/task',
        component: PageView,
        meta: { title: '信息管理', icon: infoManage, iconSelected: infoManageSelected, permission: ['dashboard'] },
        children: [
          {
            path: '/info-manage/chief',
            name: 'ChiefList',
            component: () => import('@/views/chief-manage/index'),
            meta: { title: '河湖长信息管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/archivesInfoManagement',
            name: 'ArchivesInfoManagement',
            component: () => import('@/views/archivesInfoManagement/index.vue'),
            meta: { title: '档案信息管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/section',
            name: 'SectionManagement',
            component: () => import('@/views/section/index.vue'),
            meta: { title: '断面', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/sourcemanage',
            name: 'sourcemanage',
            component: () => import('@/views/sourcemanage/sourcemanage'),
            meta: { title: '污染源管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/shuiyuandimanage',
            name: 'shuiyuandimanage',
            component: () => import('@/views/shuiyuandi/shuiyuandi'),
            meta: { title: '水源地管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/areamanage',
            name: 'areamanage',
            component: () => import('@/views/areamanage/areamanage'),
            meta: { title: '区域管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/riverlakemanage',
            name: 'riverlakemanage',
            component: () => import('@/views/riverlakemanage/riverlakemanage'),
            meta: { title: '河湖资源管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/getWaterManagement',
            name: 'getWaterManagement',
            component: () => import('@/views/getWaterManagement/index.vue'),
            meta: { title: '取水口管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/waterFunManagement',
            name: 'waterFunManagement',
            component: () => import('@/views/waterFunManagement/index.vue'),
            meta: { title: '水功能区管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/project-info',
            component: PageView,
            meta: {
              title: '工程信息管理',
              permission: ['dashboard']
            },
            children: [
              {
                path: '/info-manage/project-info/outfall',
                name: 'Outfall',
                component: () => import('@/views/outfall/index.vue'),
                meta: { title: '排污口', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          },
          {
            path: '/info-manage/monitor-info',
            component: PageView,
            meta: {
              title: '监测信息管理',
              permission: ['dashboard']
            },
            children: [
              {
                path: '/info-manage/monitor-info/water',
                name: 'Water',
                component: () => import('@/views/water/index.vue'),
                meta: { title: '水情', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/rain',
                name: 'Rain',
                component: () => import('@/views/rain/index.vue'),
                meta: { title: '雨情', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/water-quality-measure-station',
                name: 'WaterQualityMeasureStation',
                component: () => import('@/views/waterQualityMeasureStation/index.vue'),
                meta: { title: '水质测站', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/river-lake-ecological-station',
                name: 'RiverLakeEcologicalStation',
                component: () => import('@/views/riverLakeEcologicalStation/index.vue'),
                meta: { title: '河湖生态测站', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/video-station',
                name: 'VideoStation',
                component: () => import('@/views/videoStation/index.vue'),
                meta: { title: '视频站', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          },
          {
            path: '/info-manage/shoreline-info',
            component: PageView,
            meta: {
              title: '水域岸线利用',
              permission: ['dashboard']
            },
            children: [
              {
                path: '/info-manage/monitor-info/shorelinemanage',
                name: 'ShorelineManage',
                component: () => import('@/views/watershorelines/shorelineinfomanage/shorelineinfomanage'),
                meta: { title: '岸线信息管理', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/shorelineprojmanage',
                name: 'ShorelineProjManage',
                component: () => import('@/views/watershorelines/shorelineprojinfomanage/shorelineprojinfomanage'),
                meta: { title: '岸线工程信息管理', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/shorelineland',
                name: 'ShorelineLand',
                component: () => import('@/views/watershorelines/shorelinelandconde/shorelinelandconde'),
                meta: { title: '岸线用地状况', keepAlive: true, permission: ['dashboard'] }
              },
              {
                path: '/info-manage/monitor-info/shorelineplan',
                name: 'ShorelinePlan',
                component: () => import('@/views/watershorelines/shorelineplan/shorelineplan'),
                meta: { title: '岸线规划信息', keepAlive: true, permission: ['dashboard'] }
              }
            ]
          }
        ]
      },
      {
        path: '/info-manage/board',
        component: PageView,
        meta: { title: '河长公示牌', icon: infoManage, iconSelected: infoManageSelected, permission: ['dashboard'] },
        children: [
          {
            path: '/info-manage/board/board-management',
            name: 'BoardManagement',
            component: () => import('@/views/boardManage/index.vue'),
            meta: { title: '公示牌管理', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/board/template-management',
            name: 'TemplateManage',
            component: () => import('@/views/templateManage/index.vue'),
            meta: { title: '模版管理', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', hidden: true, icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    hidden: true,
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login2')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/map/MapDemo')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
