<template>
  <a-modal
    title="编辑"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" >

        <a-form-item
           v-for="item in editcolumns"
          :key="item.key"
          :label="item.title"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input    v-decorator="[item.key, {rules: [{required: true,  message: '请输入数据'}]}]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
    import API from "../../api/api_user";
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
        editcolumns: [],
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit (formcolumns,record) {
      let  that=this
        this.editcolumns=formcolumns
       console.log(record)
        this.visible = true
        let para={}
        formcolumns.forEach((pane) => {
            Object.keys(record).forEach(function(key){

                if(key==pane.key){
                    console.log(pane.key)
                    that.$set(para, key,record[key])//根据生成属性设置对应的值
                }
            })
        })
        console.log(para)
        this.$nextTick(() => {
        this.form.setFieldsValue(

            para

        )})
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            API.addUser(values)
           setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
