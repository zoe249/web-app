// 菜单数据
const menuData = [
  {
    id: '1',
    parentId: '0',
    path: '/main',
    meta: {
      name: '首页',
      icon: 'el-icon-house'
    }
  },
  {
    id: '2',
    parentId: '0',
    path: '/userManagement',
    meta: {
      name: '用户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        id: '11',
        parentId: '2',
        path: '/userManagement',
        meta: {
          name: '用户列表'
        }
      }
    ]
  },
  {
    id: '3',
    parentId: '0',
    path: '/rotationManagement',
    meta: {
      name: '轮播管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        id: '12',
        parentId: '2',
        path: '/rotationClassification',
        meta: {
          name: '轮播分类'
        }
      },
      {
        id: '13',
        parentId: '3',
        path: '/rotationManagement',
        meta: {
          name: '轮播列表'
        }
      }
    ]
  },
  {
    id: '4',
    parentId: '0',
    path: '/newsManagement',
    meta: {
      name: '新闻管理',
      icon: 'el-icon-document'
    },
    children: [
      {
        id: '14',
        parentId: '2',
        path: '/newsClassification',
        meta: {
          name: '新闻分类'
        }
      },
      {
        id: '15',
        parentId: '3',
        path: '/newsManagement',
        meta: {
          name: '新闻列表'
        }
      }
    ]
  },
  {
    id: '5',
    parentId: '0',
    path: '/systemSettings',
    meta: {
      name: '系统设置',
      icon: 'el-icon-setting'
    },
    children: [
      {
        id: '16',
        parentId: '2',
        path: '/systemSettings',
        meta: {
          name: '主题设置'
        }
      }
    ]
  }
]
export default menuData
