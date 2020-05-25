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
        component: () => import('@/views/map/MapDemo'),
        meta: { title: '一张图', icon: map, iconSelected: mapSelected, hiddenBread: true, hideHeader: true, permission: ['dashboard'], hiddenHeaderContent: true }
      },
      // 信息管理
      {
        path: '/info-manage',
        redirect: '/info-manage/task',
        component: PageView,
        meta: { title: '信息管理', icon: infoManage, iconSelected: infoManageSelected, permission: ['dashboard'] },
        children: [
          {
            path: '/info-manage/task',
            name: 'TaskList',
            component: () => import('@/views/task/Task'),
            meta: { title: 'STable Example', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/info-manage/archivesInfoManagement',
            name: 'ArchivesInfoManagement',
            component: () => import('@/views/archivesInfoManagement/index.vue'),
            meta: { title: '档案信息管理', keepAlive: true, permission: ['dashboard'] }
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
