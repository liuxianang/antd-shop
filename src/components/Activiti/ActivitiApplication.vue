<template>
    <a-modal
            title="新建"
            :width="840"
            :visible="visible"
            :confirmLoading="confirmLoading"
            @ok="handleSubmit"
            @cancel="handleCancel"

    >
        <a-spin :spinning="confirmLoading">
            <a-form :form="form">
                <div  v-for="item in addcolumns" :key="item.key">
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

                            <a-select  v-decorator="[item.key,{rules: [{required: true,  message: '请输入数据'}]}]" style="width: 240px">
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
                </div>
            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
    import API from '../../api/api_activiti'
    export default {

        data () {
            return {
                okmethod:"",
                imageurl:"",
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
                addcolumns: [],
                form: this.$form.createForm(this)
            }
        },
        methods: {

            Applicationprocess (formcolumns,taskid) {
                this.addcolumns=formcolumns;
                this.visible = true
                this.okmethod="applytask"
                this.$nextTick(() => {
                    this.form.setFieldsValue({taskid:taskid}
                    )})
            },
            approvaling (formcolumns,taskid,variables) {
                this.addcolumns=formcolumns;
                this.visible = true
                this.okmethod="approvatask"
                let params = Object.assign({taskid:taskid}, variables);
                this.$nextTick(() => {
                    this.form.setFieldsValue(params
                    )})
            },
            handleSubmit () {

                let that=this
                this.confirmLoading = true
                this.form.validateFields((errors, values) => {
                    if (!errors) {
                        this.visible = false
                        this.confirmLoading = false
                        let params = Object.assign(values);
                        if(this.okmethod=="applytask"){
                        API.applytask(params).then(function (res) {
                            that.$emit('ok', values)
                            that.$message.success(res.msg)
                        })
                        }else{
                            API.approvatask(params).then(function (res) {
                                that.$emit('ok', values)
                                that.$message.success(res.msg)
                            })
                        }

                    } else {
                        this.confirmLoading = false
                    }
                }
                )

            },
            handleCancel () {
                this.visible = false
            }
        }
    }
</script>
