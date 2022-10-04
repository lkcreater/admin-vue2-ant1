<template>
    <a-row>
        <a-col style="padding-top: 80px;">            
            <a-form-model ref="formSubmit" :model="ruleForm" :rules="rules" >

                <a-row type="flex" justify="center">
                    <a-col span="8" >
                        <UploadProfile v-model="ruleForm.image"></UploadProfile>
                    </a-col>
                    <a-col span="16" >
                        <a-form-model-item has-feedback class="width-forminput" prop="firstname">
                            <a-input type="text" size="small" placeholder="Firstname" v-model="ruleForm.firstname" >
                                <a-icon class="icon-color" slot="prefix" type="file-text" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="surename">
                            <a-input type="text" size="small" placeholder="Surename" v-model="ruleForm.surename" >
                                <a-icon class="icon-color" slot="prefix" type="file-text" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="email">
                            <a-input type="text" size="small" placeholder="Email" v-model="ruleForm.email" >
                                <a-icon class="icon-color" slot="prefix" type="mail" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="phone">
                            <a-input type="text" size="small" placeholder="Phone" v-model="ruleForm.phone" >
                                <a-icon class="icon-color" slot="prefix" type="phone" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="birthday">
                            <a-date-picker
                                v-model="ruleForm.birthday"
                                type="date"
                                placeholder="Birthday"
                                style="width: 100%;"
                            />
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="sex">
                            <a-radio-group v-model="ruleForm.sex">
                                <a-radio value="male">
                                    Male
                                </a-radio>
                                <a-radio value="female">
                                    Female
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </a-col>
                </a-row>           

            </a-form-model>
        </a-col>
    </a-row>
</template>

<script>
import UploadProfile from '@/components/Inputs/UploadProfile';
import * as Api from "@/apis/userApi";

export default {
    components: {
        UploadProfile
    },
    data() {
        let validateEmailAlready = async (rule, value, callback) => {
            if (value !== '') {
                const respone = await Api.validate({
                    field: 'email',
                    value: value
                });
                if(respone.status == 200){
                    if(respone.data.isHas === true){
                        callback(new Error('Email already exists'));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error(`Error code : ${respone.status}`));
                }            
            }          
        };

        return {
            ruleForm: {
                image: '',
                firstname: '',  
                surename: '', 
                email: '', 
                phone: '',
                birthday: '',
                sex: ''               
            },
            rules: {
                firstname: [{ required: true, trigger: 'blur' }],  
                surename: [{ required: true, trigger: 'blur' }], 
                email: [{ required: true, trigger: 'blur' }, { validator: validateEmailAlready, trigger: 'blur' }, { pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, message: 'Invalid email format message', trigger: 'change' }],    
                phone: [{ required: true, trigger: 'blur' }],      
                birthday: [{ required: true, trigger: 'change' }],
                sex: [{ required: true, trigger: 'change' }]               
            }
        };
    },
    methods: {
        async onSubmitForm() {       
            try {
                const valid = await this.$refs['formSubmit'].validate();      
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
            this.$refs['formSubmit'].resetFields();
        },
    }
}
</script>

<style scoped>
    .width-forminput{
        width: 400px;
    }
    .icon-color{
        color:rgba(0,0,0,.25)
    }
</style>
