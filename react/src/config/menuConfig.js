const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: 'UI',
    key: '/ui',
    icon: 'menu', // 图标名称
    children: [
      {
        title: '按钮',
        key: '/ui/buttons',
      },
      {
        title: '弹框',
        key: '/ui/modals',
      },
      {
        title: 'Loading',
        key: '/ui/loadings',
      },
      {
        title: '通知提醒',
        key: '/ui/notification',
      },
      {
        title: '全局Message',
        key: '/ui/messages',
      },
      {
        title: 'Tab页签',
        key: '/ui/tabs',
      },
      {
        title: '图片画廊',
        key: '/ui/gallery',
      },
      {
        title: '轮播图',
        key: '/ui/carousel',
      }
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
  },
  {
    title: '设备',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '设备分组',
        key: '/category',
        icon: 'bars'
      },
      {
        title: '设备列表',
        key: '/product',
        icon: 'tool'
      },
    ]
  },

]

export default menuList