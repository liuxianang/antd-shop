<template>
  <a-modal
    title="新建"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div  v-for="item in editcolumns" :key="item.key">
          <div v-if="item.type=='hidden'"><!--隐藏输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    style="display:none"
            >
              <a-input type ="hidden" v-decorator="[item.key]" />
            </a-form-item>
          </div>
          <div v-if="item.type=='input'"><!--输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-input v-decorator="[item.key, {rules: [{required: true,  message: '请输入数据'}]}]" />

            </a-form-item>
          </div>
          <div v-if="item.type=='disInput'"><!--只读输入框格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-input v-decorator="[item.key, {rules: [{required: true,  message: '请输入数据'}]}]" disabled/>

            </a-form-item>
          </div>
          <div v-if="item.type=='select'"><!--下拉选择格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-select  v-decorator="[item.key,]" style="width: 240px">
                <a-select-option v-for="selectitem in item.data" :key="selectitem.value">{{selectitem.text}}</a-select-option>
              </a-select>

            </a-form-item>
          </div>
          <div v-if="item.type=='disSelect'"><!--下拉选择格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >

              <a-select  v-decorator="[item.key,]" style="width: 240px" disabled>
                <a-select-option v-for="selectitem in item.data" :key="selectitem.value">{{selectitem.text}}</a-select-option>
              </a-select>

            </a-form-item>
          </div>
          <div v-if="item.type=='radio'"><!--单选格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >
              <a-radio-group  v-decorator="[item.key, ]" :options="item.data" >
              </a-radio-group>

            </a-form-item>
          </div>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
    import API from '../../api/api_menu'
export default {
  data () {
    return {
        okmethod:"",
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
        editcolumns: [],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit (formcolumns,record) {
         let that=this
        this.okmethod="edit"
        this.editcolumns=formcolumns
        console.log(record)
        this.visible = true
        let para={}
        formcolumns.forEach((pane) => {
            Object.keys(record).forEach(function(key){

                if(key==pane.key){
                    that.$set(para, key,record[key])//根据生成属性设置对应的值
                }
            })
        })
        this.$nextTick(() => {
            this.form.setFieldsValue(para
            )})
    },
      add (formcolumns,record) {
          let that=this
          this.okmethod="add"
          this.editcolumns=formcolumns
          console.log(record)
          this.visible = true
          let para={}
          formcolumns.forEach((pane) => {
              Object.keys(record).forEach(function(key){

                  if(key==pane.key){
                      that.$set(para, key,record[key])//根据生成属性设置对应的值
                  }
              })
          })
          this.$nextTick(() => {
              this.form.setFieldsValue(para
              )})
      },
    handleSubmit () {
        let that=this
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
            this.visible = false
            this.confirmLoading = false
            let params = Object.assign(values);
            if(this.okmethod=="add"){
                API.add(params).then(function (res) {
                    that.$emit('ok', values)
                    that.$message.success(res.msg)
                })
            }else{
                API.editMenu(params).then(function (res) {
                    that.$emit('ok', values)
                    that.$message.success(res.msg)
                })
            }
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
