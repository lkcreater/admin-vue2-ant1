<template>
    <a-row>
        <a-col style="padding-top: 80px;">            
            <a-form-model ref="formSubmit" :model="ruleForm" :rules="rules" >

                <a-row type="flex" justify="center">
                    <a-col span="8" >
                        <div class="lk-preview-upload">
                            <div class="lk-preview-image-file">
                                <a-icon type="contacts" />
                            </div>
                            <a-upload
                                list-type="picture"
                                :show-upload-list="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload"
                                @change="handleChange"
                                >
                                <a-button> <a-icon type="upload" /> Upload </a-button>
                            </a-upload>
                        </div>
                    </a-col>
                    <a-col span="16" >
                        <a-form-model-item has-feedback class="width-forminput" prop="firstname">
                            <a-input type="text" size="small" placeholder="Firstname" v-model="ruleForm.firstname" >
                                <a-icon class="icon-color" slot="prefix" type="file-text" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="lastname">
                            <a-input type="text" size="small" placeholder="Surename" v-model="ruleForm.lastname" >
                                <a-icon class="icon-color" slot="prefix" type="file-text" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="email">
                            <a-input type="text" size="small" placeholder="Email" v-model="ruleForm.email" >
                                <a-icon class="icon-color" slot="prefix" type="mail" />
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item has-feedback class="width-forminput" prop="tel">
                            <a-input type="text" size="small" placeholder="Phone" v-model="ruleForm.tel" >
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
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default {
    data() {
        return {
            loading: false,
            imageUrl: '',
            ruleForm: {
                image: '',
                firstname: '',  
                lastname: '', 
                email: '', 
                tel: '',
                birthday: '',
                sex: ''               
            },
            rules: {
                firstname: [{ required: true, trigger: 'blur' }],  
                lastname: [{ required: true, trigger: 'blur' }], 
                email: [{ required: true, trigger: 'blur' }, { pattern: '/^\S+@\S+\.\S+$/', message: 'Invalid email format message', trigger: 'change' }],    
                tel: [{ required: true, trigger: 'blur' }],      
                birthday: [{ required: true, trigger: 'change' }],
                sex: [{ required: true, trigger: 'blur' }]               
            }
        };
    },
    methods: {
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                    this.imageUrl = imageUrl;
                    this.loading = false;
                });
            }
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }

            return isJpgOrPng && isLt2M;
        },
    }
}
</script>

<style scoped>
    .lk-preview-upload{
        float: right;
        margin-right: 30px;
        position: relative;
        width: 200px;        
    }
    .lk-preview-image-file{   
        min-height: 150px;
        border-radius: 5px;
        border: 1px dashed rgb(221, 221, 221);
        background-color: rgb(245, 245, 245);
        margin-bottom: 15px;
    }
    .lk-preview-image-file i.anticon{
        margin-top: 15%;
        font-size: 80px;
        color: rgb(210, 210, 210);
    }
    .width-forminput{
        width: 400px;
    }
    .icon-color{
        color:rgba(0,0,0,.25)
    }
</style>
