<template>
    <a-form-model 
        ref="ruleForm"
        :model="form"
        :rules="rules"
        @submit="onSubmit"
        >

        <a-alert
            v-if="editByPk > 0"            
            show-icon
            type="info"
            :message="alertMsgMode"            
            style="margin-bottom: 15px;" >
        </a-alert>

        <a-form-model-item label="Title" prop="title">
            <a-input size="small" v-model="form.title" placeholder="please enter title"/>
        </a-form-model-item>

        <a-form-model-item label="Slug">
            <a-input size="small" v-model="form.slug" placeholder="please enter slug"/>
        </a-form-model-item>

        <a-form-model-item label="Parent category">
            <a-select size="small" v-model="form.parent_id" placeholder="please select your zone">
                <a-select-option 
                    v-for="cate in listModels" 
                    :key="cate.id" 
                    :value="cate.id">
                    {{ cate.title }}
                </a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item label="Description">
            <a-input size="small" v-model="form.desc" type="textarea" placeholder="please enter description"/>
        </a-form-model-item>  
        
        <div class="footer-drawer-cate">
            <a-popconfirm
                title="Are you sure cancel?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirmCancel">

                <a-button :style="{ marginRight: '8px' }" >
                    Cancel
                </a-button>
            </a-popconfirm>
        
            <a-button type="primary" html-type="submit">
                Submit
            </a-button>
        </div>

    </a-form-model>
</template>

<script>
import * as Api from '@/apis/categoryApi'

export default {
    computed: {
        alertMsgMode() {
            return (this.editByPk > 0) ? 'EDIT MODE : ' + this.form.title : 'ADD MODE : Create new record'
        }
    },
    data() {
        return {
            listModels: [],
            editByPk: 0,
            form: {
                title: '',
                slug: '',
                parent_id: 0,
                desc: '',
            },
            rules: {
                title: [
                    { required: true, trigger: 'blur' },
                ],
            }
        };
    },
    mounted () {
        this.onLoadList()
    },
    methods: {        
        async onCallApi(){
            if(this.editByPk > 0){
                // update record
                const respone = await Api.update(this.editByPk, this.form);

                if(respone.status == 200){
                    this.$notification['success']({
                        class: 'noti-custom-success',
                        message: 'Notification Form',
                        description: `The data was sent to the server successfully.`,
                    });
                    this.onSuccessfully();
                }
            }else{
                // new record
                const respone = await Api.add(this.form);

                if(respone.status == 200){
                    this.$notification['success']({
                        message: 'Notification Form',
                        description: `The data was sent to the server successfully.`,
                    });
                    this.onSuccessfully();
                }
            }            
        },
        async onLoadList(){
            const respone = await Api.findList();
            if(respone.status == 200){
                this.listModels = respone.data;
            }
        },
        onEditInput(item){
            this.editByPk = item.id;
            this.form = {
                title: item.title,
                slug: item.slug,
                parent_id: item.parent_id,
                desc: item.desc,
            };           
        },
        onSubmit(e) {
            e.preventDefault();
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.onCallApi()
                } else {
                    return false;
                }
            });
        },        
        resetForm() {
            this.editByPk = 0;
            this.form = {
                title: '',
                slug: '',
                parent_id: 0,
                desc: '',
            };
            this.$refs.ruleForm.resetFields();
        },
        confirmCancel(){
            this.resetForm();
            this.$emit('cancel');
        },
        onSuccessfully(){
            this.resetForm();
            this.$emit('success');
        }
    }
}
</script>

<style scoped>
    .footer-drawer-cate{
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e9e9e9;
        padding: 10px 16px;
        background: #fff;
        text-align: right;
        z-index: 1;
    }
</style>