export const userRole = {
  admin: {
    id: 'admin',
    name: 'admin',
    describe: '拥有所有权限',
    permissions: [
      {
        'roleId': 'admin',
        'permissionId': 'dashboard',
        'permissionName': '仪表盘',
        'actionEntitySet': [{
          'action': 'add',
          'describe': '新增',
          'defaultCheck': false
        }, {
          'action': 'query',
          'describe': '查询',
          'defaultCheck': false
        }, {
          'action': 'get',
          'describe': '详情',
          'defaultCheck': false
        }, {
          'action': 'update',
          'describe': '修改',
          'defaultCheck': false
        }, {
          'action': 'delete',
          'describe': '删除',
          'defaultCheck': false
        }],
        'actionList': null,
        'dataAccess': null
      },
      {
        'roleId': 'admin',
        'permissionId': 'baseDataManage',
        'permissionName': '基础数据管理',
        'actionEntitySet': [{
          'action': 'add',
          'describe': '新增',
          'defaultCheck': false
        }, {
          'action': 'query',
          'describe': '查询',
          'defaultCheck': false
        }, {
          'action': 'get',
          'describe': '详情',
          'defaultCheck': false
        }, {
          'action': 'update',
          'describe': '修改',
          'defaultCheck': false
        }, {
          'action': 'delete',
          'describe': '删除',
          'defaultCheck': false
        }],
        'actionList': null,
        'dataAccess': null
      },
      {
        'roleId': 'admin',
        'permissionId': 'user',
        'permissionName': '个人设置',
        'actionEntitySet': [],
        'actionList': null,
        'dataAccess': null
      }
    ]

  },
  enterprise: {
    id: 'enterprise',
    name: 'enterprise',
    describe: '企业权限',
    permissions: [
      {
        'roleId': 'enterprise',
        'permissionId': 'dashboard',
        'permissionName': '仪表盘',
        'actionEntitySet': [{
          'action': 'add',
          'describe': '新增',
          'defaultCheck': false
        }, {
          'action': 'query',
          'describe': '查询',
          'defaultCheck': false
        }, {
          'action': 'get',
          'describe': '详情',
          'defaultCheck': false
        }, {
          'action': 'update',
          'describe': '修改',
          'defaultCheck': false
        }, {
          'action': 'delete',
          'describe': '删除',
          'defaultCheck': false
        }],
        'actionList': null,
        'dataAccess': null
      },
      {
        'roleId': 'enterprise',
        'permissionId': 'baseDataManage',
        'permissionName': '基础数据管理',
        'actionEntitySet': [ {
          'action': 'query',
          'describe': '查询',
          'defaultCheck': false
        }, {
          'action': 'get',
          'describe': '详情',
          'defaultCheck': false
        }, {
          'action': 'update',
          'describe': '修改',
          'defaultCheck': false
        }],
        'actionList': null,
        'dataAccess': null
      },
      {
        'roleId': 'enterprise',
        'permissionId': 'user',
        'permissionName': '个人设置',
        'actionEntitySet': [],
        'actionList': null,
        'dataAccess': null
      }
    ]

  }
}
