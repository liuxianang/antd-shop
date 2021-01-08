import * as API from './'

export default {
    checkLogin: params => {
    return API.GET('/api-shop/user/checkLogin', params)
  },
    list: params => {
        return API.GET('/api-shop/goods/listgoods', params)
    },
    login: params => {
        return API.GET('/api-shop/user/loginshop', params)
    },
    getOrderData: params => {
        return API.GET('/api-shop/orderlist/ordershoplist', params)
    },
    logout: params => {
        return API.GET('/api-shop/user/loginoutshop', params)
    },
    addCart: params => {
        return API.GET('/api-shop/cartlist/addcart', params)
    },
    getCartData: params => {
        return API.GET('/api-shop/cartlist/cartshoplist', params)
    },
    delProduct: params => {
        return API.GET('/api-shop/cartlist/delcart', params)
    },
    insertAdr: params => {
        return API.GET('/api-shop/addresslist/saveshopaddress', params)
    },
    delAdr: params => {
        return API.GET('/api-shop/addresslist/deleteAdr', params)
    },
    editProductNum: params => {
        return API.GET('/api-shop/user/loginshop', params)
    },
    addressList: params => {
        return API.GET('/api-shop/addresslist/addressshopList', params)
    },
    payOrder: params => {
        return API.GET('/api-shop/orderlist/payOrder', params)
    },
    updateOrder: params => {
        return API.GET('/api-shop/orderlist/updateOrder', params)
    },
    delOrder: params => {
        return API.GET('/api-shop/orderlist/delOrder', params)
    },
    editSelectAll: params => {
        return API.GET('/api-shop/cartlist/editSelectAll', params)
    },
    getDetails: params => {
        return API.GET('/api-shop/goods/getDetails', params)
    },
    searchData: params => {
        return API.GET('/api-cms/file', params)
    },
}
