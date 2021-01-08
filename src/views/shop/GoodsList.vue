<template>
    <div>
        <div class="index-wrapper">
            <mall-header v-on:initscroll="scrollTop"></mall-header>
           <mall-bread>
                <span>商品列表</span>
            </mall-bread>
            <div class="guide-content">
                <!-- <div class="left-content"></div> -->
                <div class="right-content">
                   <slide-show :slides="slides" :inv="invTime"></slide-show>
                </div>
            </div>
            <div class="accessory-result-page accessory-page">
                <div class="container" ref="accHock">
                    <div class="filter-nav">
                        <span class="sortby">排序:</span>
                        <a href="javascript:void(0)" class="default" :class="{'cur':isDefault}"
                           @click="sortDefault">默认</a>
                        <a href="javascript:void(0)" class="price" @click="sortGoods" :class="{'cur':!isDefault}">价格 <i
                                :class="sortFlag===true?'icon-arrow-up2':'icon-arrow-down2'"></i></a>
                        <a href="javascript:void(0)" class="filterby stopPop" @click="filterByPop">过滤价格</a>
                    </div>
                    <div class="accessory-result">
                        <!-- filter -->
                        <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                            <dl class="filter-price">
                                <dt>价格:</dt>
                                <dd><a href="javascript:void(0)" :class="{'cur':clickflag==='all'}"
                                       @click.stop="setClickAll">All</a></dd>
                                <dd v-for="(price,index) in priceFilter" :key="index">
                                    <a href="javascript:void(0)" :class="{'cur':clickflag===index?true:false}"
                                       @click="setClickFlag(index)">{{price.startPrice}}-{{price.endPrice}}</a>
                                </dd>
                            </dl>
                        </div>

                        <!-- search result accessories list -->
                        <div class="accessory-list-wrap">
                            <div class="accessory-list col-4" v-if="checkGoodsLen">
                                <ul>
                                    <li v-for="item in goodsList" :key="item.id">
                                        <div class="pic">
                                            <a href="#"><img v-lazy="require(`../../static/${item.productimg}`)" alt=""></a>
                                            <!--v-lazy图片懒加载-->
                                        </div>
                                        <div class="main">
                                            <div class="name">{{item.productname}}</div>
                                            <div class="details"><a href="javascript:;"
                                                                    :title="`${item.productdetails}`"
                                                                    @click="goDetail(item)">{{item.productdetails}}</a>
                                            </div>
                                            <div class="price">{{item.productprice | formatMoney('元')}}</div>
                                            <div class="btn-area">
                                                <a href="javascript:;" class="btn btn--m"
                                                   @click="goDetail(item)">查看详情</a>
                                                <a href="javascript:;" class="btn btn--m"
                                                   style="background: #d1434a; color:#fff;"
                                                   @click="addCart(item)">加入购物车</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                                     infinite-scroll-distance="30">
                                    <div class="loading" style="text-align: center" v-show="!busy">
                                        <img src="../../static/loading-svg/loading-spinning-bubbles.svg" alt="">
                                    </div>
                                    <!--  <p style="text-align: center" v-show="!busy">loading...</p>	 -->
                                </div>
                            </div>
                            <div v-if="!checkGoodsLen"
                                 style="width:100%; height:100%; background:url(../../static/404.png) no-repeat center;">
                                <!-- <img src="../../static/404.jpg" alt=""> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
          <modal :mdShow="mdShow" v-on:close="closeModal">
                <p slot="message">{{showText}}</p>
                <div slot="btnGroup">
                    <a href="javascript:;" class="btn btn&#45;&#45;m" @click="mdShow=false" v-if="!ifCart">关闭</a>
                    <a href="javascript:;" class="btn btn&#45;&#45;m" @click="mdShow=false" v-if="ifCart">继续购物</a>
                    <router-link to="/index/cart" class="btn btn&#45;&#45;m" @click="mdShow=false" v-if="ifCart">去购物车</router-link>
                </div>
            </modal>
            <mall-footer></mall-footer>
        </div>
    </div>
</template>
<script>
    import mallHeader from '@/components/shop/header'
    import mallFooter from '@/components/shop/footer'
    import mallBread from '@/components/shop/navbread'
    import modal from '@/components/shop/modal'
    import slideShow from '@/components/shop/slideShow'
    // import BScroll from 'better-scroll'
    import API from '../../api/api_shop'
    import {mapState} from 'vuex'
    import $ from 'jquery'

    export default {
        data() {
            return {
                // goodsList:[],
                priceFilter: [
                    {
                        startPrice: 0,
                        endPrice: 500
                    },
                    {
                        startPrice: 500,
                        endPrice: 1000
                    },
                    {
                        startPrice: 1000,
                        endPrice: 2000
                    },
                    {
                        startPrice: 2000,
                        endPrice: 5000
                    },
                    {
                        startPrice: 5000,
                        endPrice: 10000
                    }
                ],
                clickflag: 'all',
                filterBy: false,
                overLayFlag: false,
                sortFlag: '',
                page: 1,
                pageSize: 8,
                busy: true,
                priceLevel: 'all',
                productId: '',
                productNum: 1,
                isDefault: true,
                mdShow: false,
                showText: '',
                ifCart: false,
                invTime: 2000,
                slides: [
                    {
                        src: require('../../static/slide-img/14766931740570.jpg'),
                        title: '',
                        href: 'detail/analysis'
                    },
                    {
                        src: require('../../static/slide-img/15144381201181.jpg'),
                        title: '',
                        href: 'detail/count'
                    },
                    {
                        src: require('../../static/slide-img/15144443267556.jpg'),
                        title: '',
                        href: 'http://xxx.xxx.com'
                    },
                    {
                        src: require('../../static/slide-img/15144482787248.jpg'),
                        title: '',
                        href: 'detail/forecast'
                    }
                ],

            }
        },
        created() {
            // this.$nextTick(() => {
            //            if (!this.accScroll) {
            //                 this.accScroll = new BScroll(this.$refs.accHock, {
            //                click: true
            //            });
            //        } else {
            //            this.accScroll.refresh();
            //        }
            //        });
        },
        mounted() {
            this.getGoodList();
        },
        filters: {
            formatMoney: function (value, type) {
               /* return "¥" + value.toFixed(2) + type;*/
           return "¥" +value.toFixed(2) + type
            }
        },
        computed: {
         ...mapState(['goodsList', 'checkGoodsLen'])
            //goodsList() {
            //   return this.$store.state.myName;
            // },
        },
        methods: {
            getGoodList(flag) {
                var sortVul;
                if (this.sortFlag === true) {
                    sortVul = 1;
                } else if (this.sortFlag === false) {
                    sortVul = 0;
                } else {
                    sortVul = '';
                }
                var param = {
                    page: this.page,
                    limit: this.pageSize,
                    sort: sortVul,
                    Pricelevel: this.clickflag
                }
                // 将参数传递给后端
                API.list( param ).then((response) => {

                    if (response.code == '0') {

                        if (flag) {
                            var listCon = this.goodsList.concat(response.page.rows);
                            this.$store.commit('updateGoodslist', listCon);

                            if (response.page.total == 0) { // 判断加载到哪条数据

                                this.busy = true;
                            } else {
                                this.busy = false;
                            }
                        } else {
                            //this.goodsList = response.page.rows;
                            this.$store.commit('initGoodslist', response.page.rows);
                            this.busy = false;
                            console.log(this.goodsList);
                        }

                    } else {
                        //this.goodsList = [];
                        this.$store.commit('updateGoodslist', []);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            goDetail(item) {
                console.log(item);
                let Base64 = require('js-base64').Base64;
                this.$router.push({

                   path: `/index/goodsdetails?m=${Base64.encode(item.productid)}}`
                });
            },
            addCart(value) {
                if(localStorage.getItem('user')==""){
                    this.showText = "当前未登录";
                    this.mdShow = true;
                }else{
                this.productId = value.productid;
                var param = {
                    userid:JSON.parse(localStorage.getItem('user')).userId,
                    productId: value.productid,
                    productNum: '1',
                    productPrice: value.productprice,
                    checked: 1,
                    productName: value.productname,
                    productImg: value.productimg,
                };
                //将productId传给后台
                API.addCart(param ).then((res) => {
                    // console.log(res.status);
                    if (res.status === '1') {
                        // console.log('success!');
                        //alert(`${res.msg}`);
                        //value.push(this.productNum);

                        // value.forEach((item) => {
                        // 	if(item.productId === productId)
                        // });
                     /*  this.$store.commit('updateCartList', setData);*/
                        this.$store.commit('updatecarCount', res.cartcount);
                        /*this.$store.commit('updateCartCount', 1);*//*更换新方法*/
                        this.$store.commit('updateHaveProduct', true);
                        this.showText = res.msg;
                        this.mdShow = true;
                        this.ifCart = true;
                        //this.isFull = true;
                    } else if (res.status === '10001') {
                        //alert(`${res.msg}`);
                        this.showText = res.msg;
                        this.mdShow = true;
                    } else {
                        console.log('faile!');
                    }
                }).catch((error) => {
                    console.log(error);
                });
                }
            },
            sortGoods() {
                this.sortFlag = !this.sortFlag;
                this.isDefault = false;
                this.page = 1;
                this.getGoodList();
            },
            sortDefault() {
                this.sortFlag = '';
                this.isDefault = true;
                this.page = 1;
                this.getGoodList();
            },
            setClickAll() {
                this.clickflag = 'all';
                this.page = 1;
                this.getGoodList();
                this.closePop();
            },
            setClickFlag(index) {
                this.clickflag = index;
                this.page = 1;
                this.getGoodList();
                this.closePop();
            },
            filterByPop() {
                let clientWidth = document.body.clientWidth;
                if (clientWidth <= 767) {
                    this.overLayFlag = true;
                    this.filterBy = true;
                }
            },
            closePop() {
                this.overLayFlag = false;
                this.filterBy = false;
            },
            loadMore() {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodList(true);
                }, 1000);
            },
            closeModal() {
                this.mdShow = false;
            },
            scrollTop() {
                //document.body.scrollTop = 480;
                //console.log(this.$route.query);
                $('html,body').animate({scrollTop: 480}, 500);
            }
        },
        components: {
            mallHeader,
            mallFooter,
            mallBread,
            modal,
            slideShow
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .guide-content
        width: 100%
        display: flex
        background: url('../../static/slide-img/15115169565977.jpg') no-repeat center top;
        padding-bottom: 30px
        .right-content
            flex: 1
            margin-top: 60px

    .accessory-list-wrap
        .main
            .name
                height: 3em !important
            .details
                height: 18px
                overflow: hidden
                // white-space:nowrap
                text-overflow: ellipsis


</style>
