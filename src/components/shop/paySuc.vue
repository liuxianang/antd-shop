<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .md-show
    display:block
  .md-modal
    .md-modal-inner
      padding:50px 20px
  .pay-type
    margin: 0 auto
    width: 100%
    .p-title
      font-size: 18px
      font-weight:500
      line-height: 40px
      padding: 0 10px
      text-align:left
      position: relative
      &:before
        content: ' '
        position: absolute
        bottom: 0
        left: 0
        right: 0
        border-bottom: 1px solid #ccc
    .pay-item
      display: flex
      align-items: center
      padding:10px 0
      position:relative
      left:50%
      transform:translateX(-50%)
      div
        margin-top: 20px
        width: 140px
        height: 50px
        display: flex;
        align-items: center
        justify-content: center
        border: 1px solid #E5E5E5
        cursor: pointer
        border-radius: 6px
        margin-right: 10px
        background: #FAFAFA
        &:last-child
          margin-right:0
        @media (max-width:767px)
          width:90px
          height:40px
          margin-right:15px
          &:last-child
            margin-right:0
        img
          display: block
          height: 34px
          margin: 8px auto
          @media (max-width:767px)
            width:100%
            height:100%
      .active
        border-color: #6A8FE5
        background: #fff
    .com-btn
      width:350px
      line-height:30px
      margin:0px auto
      margin-top:50px
      @media (max-width:767px)
        width:280px
      .yes
        display:block
        height:100%
        background:rgb(209, 67, 74)
        color:#fff
        border-radius:6px
  .pay-sao
    width:100%
    .title
      text-align: center
      line-height: 24px
      font-size: 14px
      color: #999
    .money
      text-align: center
      font-size: 30px
      color: #d44d44
      font-weight: 700
    .img-box
      position: relative
      width: 180px
      height: auto
      min-height: 168px
      margin: 0 auto
      border: 1px solid #d3d3d3
      box-shadow: 1px 1px 1px #ccc
      display: inline-block
      .pic
        width:168px
        height:168px
      .explain
        display:flex
        padding:5px 10px
        img
          flex:0 0 38px
          height:38px
        .fn-right
          font-size:12px
          line-height:16px
          margin-left:30px
  .btn--pay
    background-color: #999
    border-color: #999
</style>
<script>
    export default{
        props:["mdShow"],
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          }
        }
    }
</script>
