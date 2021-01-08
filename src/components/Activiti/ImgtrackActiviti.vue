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
            <img :src=imageurl />
        </a-spin>
    </a-modal>
</template>

<script>
    export default {
        data () {
            return {
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
            opentrackimg (pProcessInstanceId,processDefinitionId) {
                this.imageurl="http://localhost:8011/task/querytaskimage?processDefinitionId="+processDefinitionId+"&pProcessInstanceId="+pProcessInstanceId;
                this.visible = true
            },
            handleSubmit () {
                const { form: { validateFields } } = this
                this.confirmLoading = true
                validateFields((errors, values) => {
                    if (!errors) {

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
