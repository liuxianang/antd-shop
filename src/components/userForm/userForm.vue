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
              <a-radio-group :options="item.data" />

            </a-form-item>
          </div>
          <div v-if="item.type=='tree'"><!--树格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >
              <a-tree
                      checkable
                      @expand="onExpand"
                      :expandedKeys="expandedKeys"
                      :autoExpandParent="autoExpandParent"

                      v-model="checkedKeys"
                      @select="onSelect"
                      :selectedKeys="selectedKeys"
                      :treeData="treeData"
              />

            </a-form-item>
          </div>
          <div v-if="item.type=='checkbox'"><!--复选格式-->
            <a-form-item
                    :label="item.title"
                    :labelCol="labelCol"

                    :wrapperCol="wrapperCol"
            >
              <a-checkbox-group :options="roleData"  v-model="checkedList"/>

            </a-form-item>
          </div>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

    import API from "../../api/api_role";
export default {
  data () {
    return {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData:[],
        roleData:[],
        checkedList:[],
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
      onExpand(expandedKeys) {
          console.log('onExpand', expandedKeys);
          // if not set autoExpandParent to false, if children expanded, parent can not collapse.
          // or, you can remove all expanded children keys.
          this.expandedKeys = expandedKeys;
          this.autoExpandParent = false;
      },
      onCheck(checkedKeys) {
          console.log('onCheck', checkedKeys);
          this.checkedKeys = checkedKeys;
      },
      onSelect(selectedKeys, info) {
          console.log('onSelect', info);
          this.selectedKeys = selectedKeys;
      },
    edit (formcolumns,record) {
          let that=this
        this.editcolumns=formcolumns
       console.log(record)


        this.visible = true

        API.findList('').then(function (res) {
            let reg=new RegExp("\"roleName\":","g")//g代表全部
            let reg1=new RegExp("\"roleId\":","g")//g代表全部
            that.roleData = JSON.parse(JSON.stringify(res.rows).replace(reg,"\"label\":").replace(reg1,"\"value\":"))//调整json格式
       console.log(JSON.stringify(that.roleData))

        })
       API.findById( record.userId).then(function (res) {
           that.checkedList=res

        })
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
  },

}
</script>
