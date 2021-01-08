<!--商品详情-->
<template>
<div>
  <mall-header v-on:initscroll="scrollTop"></mall-header>
  <mall-bread>
  <span>商品列表</span>
  </mall-bread>
  <div class="w store-content" v-for="item in goodsList" :key="item.id">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li :class="{on:big===1}" @click="big=1">
                <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
              </li>
              <li :class="{on:big===2}" @click="big=2">
                <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
              </li>
              <li :class="{on:big===3}" @click="big=3">
                <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
              </li>
              <li :class="{on:big===4}" @click="big=4">
                <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
              </li>
              <li :class="{on:big===5}" @click="big=5">
                <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
              </li>
              <!-- <li>
                <img src="../assets/img/1.png" alt="">
              </li> -->
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img v-lazy="require(`../../static/${item.productimg}`)" :alt="item.productname">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{item.productdetails}}</h4>
          <h6>
            <span>{{item.subTitle}}</span>
            <span class="price">
              <em>¥</em><i>{{item.productprice}}</i></span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @edit-num="editNum" :limit="Number(item.limitNum)"></buy-num>
        </div>
        <div class="buy">
          <y-button text="加入购物车"
                    @btnClick="addCart(item)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <y-button text="现在购买"
                    @btnClick="checkout(product.productId)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
          <!-- <div class="img-item">
            <div></div>
          </div> -->
          <div class="no-info">
            <img v-lazy="require(`../../static/details-img/${item.descimg}`)">
            <br>
            {{item.desc}}
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
  <modal :mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">{{showText}}</p>
          <div slot="btnGroup">
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="!ifCart">关闭</a>
            <a href="javascript:;" class="btn btn--m" @click="mdShow=false" v-if="ifCart">继续购物</a>
            <router-link to="/index/cart" class="btn btn--m" @click="mdShow=false" v-if="ifCart">去购物车</router-link>
          </div>
        </modal>
  <mall-footer></mall-footer>
</div>
</template>
<script>

  import YShelf from '@/components/shop/shelf'
  import BuyNum from '@/components/shop/buynum'
  import YButton from '@/components/shop/YButton'
  import mallHeader from '@/components/shop/header.vue'
  import mallFooter from '@/components/shop/footer.vue'
  import mallBread from '@/components/shop/navbread.vue'
  import modal from '@/components/shop/modal.vue'
  // import { getStore } from '/utils/storage'
  import API from '../../api/api_shop'
  import $ from 'jquery'
  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        goodsList:[],
        big: 1,
        product: {},
        productNum: 1,
        userId: '',
        mdShow:false,
        showText:'',
        ifCart:false,
        productId:''
      }
    },
    computed: {

      // ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted() {
      this.getdata();
    },
    methods: {
      getdata(){
          let Base64 = require('js-base64').Base64;
        var m = Base64.decode(this.$route.query.m);
        // alert(m);
        var param = ({
          productid:m
        });
        API.getDetails(param).then((res) => {
          if(res.code == '0') {
            this.goodsList = res.data;
          }
        });
      },
      editNum (num) {
        this.productNum = num
        //console.log(this.productNum);
      },
      addCart(value) {
          this.productId = value.productid;
          var param = {
            userid:JSON.parse(localStorage.getItem('user')).userId,
            productId:this.productId,
            productNum:this.productNum,
            productPrice: value.productprice,
            checked:1,
            productName: value.productname,
            productImg: value.productimg,
          };
          //console.log(this.productNum)
          //将productId传给后台
          API.addCart(param ).then((res) => {
            // console.log(res.status);
            if(res.status == '1'){
              this.$store.commit('updatecarCount', res.cartcount);
              this.$store.commit('updateHaveProduct', true);
              this.showText = res.msg;
              this.mdShow = true;
              this.ifCart = true;
            }else if(res.status === '10001'){
                    //alert(`${res.msg}`);
                    this.showText = res.msg;
                    this.mdShow = true;
            }else{
              console.log('faile!');
            }
          }).catch((error) => {
            console.log(error);
          });
        },
        closeModal() {
          this.mdShow = false;
        },
      checkout (productId) {
        API.checkLogin({name:JSON.parse(localStorage.getItem('user')).userName,id:JSON.parse(localStorage.getItem('user')).id} ).then((res) => {
            if(res.status == '1') {
             this.$router.push({
                    path: '/index/address', query: {productId, num: this.productNum}
                  });
            } else if(res.status == '10001'){
                    //alert(`${res.msg}`);
                    this.showText = res.msg;
                    this.mdShow = true;
           }
          });
      },
      scrollTop() {
          var promise = new Promise(()=>{
            this.$router.push({
                path:`/`
            });
          }).then($('html,body').animate({scrollTop:480},500));
          console.log(promise);
      }
    },
    components: {
      YShelf, 
      BuyNum, 
      YButton,
      mallHeader,
      mallFooter,
      mallBread,
      modal
    },
    created () {
        //this.getdata()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";
  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 580px;
      margin-left: 10px;
      h4 {
        font-size: 16px;
        font-weight:700;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
</style>
