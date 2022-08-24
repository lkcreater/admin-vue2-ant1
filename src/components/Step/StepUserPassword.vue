<template>    
    <a-row>
        <a-col :span="12" :offset="6" style="padding-top: 80px;">
            
            <h6 style="text-align: left;">Setup Username and Password</h6>
               
            <div style="padding-top: 10px; margin-bottom:70px">
                <a-form-model ref="formUsernamePassword" :model="ruleForm" :rules="rules" v-bind="layout">

                    <a-form-model-item has-feedback prop="user">
                        <a-input size="small" v-model="ruleForm.user" type="text" autocomplete="off" placeholder="Username">
                            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item has-feedback prop="pass">
                        <a-input size="small" v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="password">
                            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item has-feedback prop="checkPass">
                        <a-input size="small" v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="Confirm Password">
                            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                    </a-form-model-item>

                </a-form-model>
            </div>
        </a-col>
    </a-row>  
</template>

<script>
export default {
    data() {

        let validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the Username'));
            } else {
                callback();
            }
        };
        
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the Password'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs['formUsernamePassword'].validateField('checkPass');
                }
                callback();
            }
        };

        let validatePassConfirm = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("Two inputs don't match!"));
            } else {
                callback();
            }
        };

        return {
            ruleForm: {
                user: '',
                pass: '',
                checkPass: '',                
            },
            rules: {
                user: [{ validator: validateUser, trigger: 'change' }, { min: 4, message: 'Length should min 4', trigger: 'change' }],
                pass: [{ validator: validatePass, trigger: 'change' }, { min: 4,  message: 'Length should be min 4', trigger: 'change' }],
                checkPass: [{ validator: validatePassConfirm, trigger: 'change' }, { min: 4, message: 'Length should min 4', trigger: 'change' }],
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