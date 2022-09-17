<template>
    <a-card :bordered="false" class="header-solid h-full">
        <!-- title -->
        <h5>{{ title }}</h5>	
		
        <!-- avatar -->
        <a-avatar 
            class="lk-avatar-design"
            shape="square" 
            :icon="iconUpload"
            :src="image">
        </a-avatar>

        <!-- button -->
        <div style="margin-top: 30px;">
            <a-upload
                v-if="models == null"
                name="file"
                :action="urlApiUpload"
                :multiple="false"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange">

                <a-button type="dashed" style="margin-right: 15px;">
                    <a-icon type="upload" />
                    Browse Image
                </a-button>
            </a-upload>

            <span v-if="models != null">
                <a-button v-if="editFile" type="dashed" @click="openEdit" style="margin-right: 15px;">
                    <a-icon type="edit" />
                    Edit
                </a-button>
            
                <a-popconfirm  title="Are you sure？" ok-text="Yes" cancel-text="No" @confirm="confirmDelImage">
                    <a-button type="danger">
                        <a-icon type="delete" />
                        Del
                    </a-button>
                </a-popconfirm>
            </span>
        </div>

        <WidgetCropper
            v-if="editFile"
            v-model="models"
            :visible.sync="visible"
            @success="onSuccess">
        </WidgetCropper>
	</a-card>
</template>

<script>
import WidgetCropper from '@/components/Widgets/WidgetCropper';
import * as Api from '@/apis/mediaApi';

export default {
    components: {
        WidgetCropper
    },
    props: {
        value: {
            type: [String, Object]
        },
        title: {
            type: String,
            default: 'Title'
        },
        editFile:{
            type: Boolean,
            default: false
        }
    }, 
    computed: {
        iconUpload() {
            return (this.loading) ? 'loading' : 'camera';
        }
    },
    mounted () {
        this.data(this.value);
    },
    data(){
        return {
            visible: false,
            urlApiUpload: Api.getUrlUploadImage(),
            loading: false,
            models: null,
            image: ''//'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        }
    },
    methods: {
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG or PNG file!');
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }

            return isJpgOrPng && isLt2M;
        },
        handleChange(info) {
            if (info.file.status == 'uploading') {
                this.loading = true;
            }else{
                this.loading = false;
                if (info.file.status === 'done') {
                    this.data(info.file.response);
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {                    
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            }
        },
        onSuccess(file){
            this.data(file);
            this.visible = false;
        },
        data(file){
            if(file){
                this.$emit('input', file)
                this.models = file;
                this.image = Api.getUrl(file.url);
            }
        },
        reset(){
            this.$emit('input', {})
            this.models = null;
            this.image = '';
        },
        confirmDelImage(){
            this.reset();
        },
        openEdit(){
            this.visible = true;            
        }
    },   
}
</script>

<style scoped>
@media (max-width: 768px){
    .lk-avatar-design{
        line-height: 2 ;
        height: 165px ;
    }
}
.lk-avatar-design{
    width: 100%; 
    height: 315px;
    border-radius: 12px;
    font-size: 100px !important;
    line-height: 3;
    color: rgb(183 183 183);
    box-shadow: 0 5px 10px rgba(0,0,0,.12)!important;
    background-color: #c1c1c16b;
}
</style>