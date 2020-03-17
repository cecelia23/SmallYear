const menu = [
    {
        title: '主页',
        key: '/home',
        icon: 'home'
    },
    {
        title: '商品',
        key: '/goods',
        icon: 'appstore',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'unordered-list'
            },{
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            }
        ]
    },{
        title: '用户管理',
        key: '/user',
        icon: 'user'
    },{
        title: '角色管理',
        key: '/role',
        icon: 'safety-certificate'
    },{
        title: '图形表格',
        key: '/chart',
        icon: 'picture',
        children: [
            {
                title: '柱状图',
                key: '/chart/bar',
                icon: 'bar-chart'
            },{
                title: '折线图',
                key: '/chart/line',
                icon: 'line-chart'
            },{
                title: '饼图',
                key: '/chart/pie',
                icon: 'pie-chart'
            }
        ]
    },
]
export default menu;