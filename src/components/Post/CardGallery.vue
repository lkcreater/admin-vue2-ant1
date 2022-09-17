<template>
    <a-card :bordered="false" class="header-solid h-full">
        <h5>{{ title }}</h5>

        <a-row>
            <a-col>
                <a-upload-dragger
                    class="lk-upload-dragger"
                    name="file"
                    :multiple="true"
                    :show-upload-list="false"
                    :action="urlApi"
                    :before-upload="beforeUpload"
                    @change="handleChange">

                    <p class="ant-upload-drag-icon">
                        <a-icon :type="icon" />
                    </p>
                    <p class="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </a-upload-dragger>
            </a-col>
        </a-row>

        <a-row>
            <a-col class="lk-gallery-list" >

                <a-popover v-for="(file, index) in fileLists" :key="index">
                    <a-avatar shape="square" :size="50" icon="user" :src="url(file.url)"/>
                    <template slot="content">
                        <a-button size="small" type="dashed" style="margin-right: 10px;" @click="viewFile(file.url)">
                            <a-icon type="eye" />
                            View
                        </a-button>
                        <a-button type="danger" size="small" @click="removeFile(index)" >
                            <a-icon type="delete" />
                            Del
                        </a-button> 
                    </template>                    
                </a-popover>             
                
            </a-col>
        </a-row>

        <a-modal
            :width="700"  
            :visible="visible"
            :footer="null"
            @cancel="visible = false"> 
            <img :src="viewImage" style="width: 100%">
        </a-modal> 
        
    </a-card>
</template>

<script>
import * as Api from '@/apis/mediaApi';

export default {
    props: {
        value:{
            type: [Array, Object]
        },
        title: {
            type: String,
            default: 'Post Gallery'
        },
    },
    computed: {
        icon() {
            return (this.loading) ? 'loading' : 'inbox' 
        }
    },
    watch: {
        value: function(){
            this.data(this.value);
        }
    },
    mounted () {
        this.data(this.value);
    },
    data(){
        return {
            urlApi: Api.getUrlUploadImage(),
            loading: false,
            fileLists: [],
            visible: false,
            viewImage: ''
        }
    },
    methods: {
        data(value){
            this.fileLists = value;
        },
        url(filename){
            return (filename) ? Api.getUrl(filename) : '';
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
        handleChange(info) {
            const status = info.file.status;
            if (status === 'uploading') {
                this.loading = true;
            }else{
                this.loading = false;
                if (status === 'done') {
                    this.fileLists.push(info.file.response);
                    this.$emit('input', this.fileLists);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            }
        },
        viewFile(file){
            this.viewImage = this.url(file);
            setTimeout(() => {
                this.visible = true;
            }, 100);            
        },
        removeFile(index){
            this.fileLists.splice(index, 1);
            this.$emit('input', this.fileLists);
        }
    },
}
</script>

<style>
.lk-upload-dragger .ant-upload-drag{
    height: 120px;
}
</style>