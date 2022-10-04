<template>    
    <a-row>
        <a-col :span="12" :offset="6" style="padding-top: 80px;">
            
            <h6 style="text-align: left;">Setup Username and Password</h6>
               
            <div style="padding-top: 10px; margin-bottom:70px">
                <a-form-model ref="formUsernamePassword" :model="ruleForm" :rules="rules" v-bind="layout">

                    <a-form-model-item has-feedback prop="username">
                        <a-input size="small" v-model="ruleForm.username" type="text" autocomplete="off" placeholder="Username">
                            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item has-feedback prop="password">
                        <a-input size="small" v-model="ruleForm.password" type="password" autocomplete="off" placeholder="password">
                            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item has-feedback prop="repassword">
                        <a-input size="small" v-model="ruleForm.repassword" type="password" autocomplete="off" placeholder="Confirm Password">
                            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                </a-form-model>
            </div>
        </a-col>
    </a-row>  
</template>

<script>
import * as Api from "@/apis/userApi";

export default {
    data() {   
        let validateUserExists = async (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the Username'));
            } else {
                const respone = await Api.validate({
                    field: 'username',
                    value: value
                });
                if(respone.status == 200){
                    if(respone.data.isHas === true){
                        callback(new Error('Username already exists'));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error(`Error code : ${respone.status}`));
                }            
            }
        };

        let validatePassConfirm = (rule, value, callback) => {
            if (value !== this.ruleForm.password) {
                callback(new Error("Two inputs don't match!"));
            } else {
                callback();
            }
        };

        return {
            ruleForm: {
                username: '',
                password: '',
                repassword: '',                
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur' },                    
                    { min: 4, message: 'Length should min 4', trigger: 'change' },
                    { validator: validateUserExists, trigger: 'blur' }, 
                ],
                password: [
                    { required: true, trigger: 'blur' },
                    { min: 4,  message: 'Length should be min 4', trigger: 'change' }
                ],
                repassword: [
                    { required: true, trigger: 'blur' },
                    { validator: validatePassConfirm, trigger: 'change' }, 
                    { min: 4, message: 'Length should min 4', trigger: 'change' },                    
                ],
            },
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
        };
    },
    methods: {
        async onSubmitForm() {       
            try {
                const valid = await this.$refs['formUsernamePassword'].validate();      
                if (valid) {                    
                    return {
                        status: 'process',
                        models: this.ruleForm
                    }
                }    
            } catch (error) {
                if(error == false){
                    return {
                        status: 'error',
                        models: []
                    }
                }
            }             
        },
        resetForm() {
            this.$refs['formUsernamePassword'].resetFields();
        },
    },
};
</script>