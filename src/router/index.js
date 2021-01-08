import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
let router = new Router({
    mode: 'history',
    routes: [

        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name: '首页',
            component: () => import('@/views/shop/GoodsList'),
            children: [

            ]
        },
        {
            path: '/index/cart',
            name: '购物车',
            component: () => import('@/views/shop/Cart'),
        },
        {
            path: '/index/orderlist',
            name: '订单',
            component: () => import('@/views/shop/OrderList'),
        },
        {
            path: '/index/address',
            name: '收货地址',
            component: () => import('@/views/shop/Address'),
        },
        {
            path: '/index/orderConfirm',
            name: '订单生成',
            component: () => import('@/views/shop/OrderConfirm'),
        },
        {
            path: '/index/orderinfo',
            name: '订单生成',
            component: () => import('@/views/shop/OrderSuccess'),
        },
        {
            path: '/index/addresslist',
            name: '地址列表',
            component: () => import('@/views/shop/AddressList'),
        },
        {
            path: '/index/goodsdetails',
            name: '商品详情',
            component: () => import('@/views/shop/GoodsDetails'),
        },
    ]

})

router.beforeEach((to, from, next) => {
    // console.log('to:' + to.path)

    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('access-token')
        //window.localStorage.removeItem('access-user')
        next()
    } else if (to.path.startsWith('/index')) {
        next()
    }
    else if (to.path.startsWith('/myjshop')) {
        next()
    }
    else if (to.path.startsWith('/myexamonline')) {
        next()
    }
    else if (to.path.startsWith('/myblog')) {
        next()
    }
    else if (to.path.startsWith('/mytest')) {
        next()
    } else {
        let user = window.localStorage.getItem('access-token');
        if (!user) {
            next({path: '/login'})
        } else {
            next()
        }
    }
})

export default router
