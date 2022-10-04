<template>
    <div>
        <a-row>
            <a-col style="padding-top: 10px;">
                <a-avatar shape="square" :src="imageUrl" :size="150" :icon="iconAvatar" />
            </a-col>
        </a-row>
        <a-row>
            <a-col style="padding-top: 20px;">
                <a-upload
                    list-type="picture"
                    :headers="$store.getters['auth/setHeader']"
                    :show-upload-list="false"
                    :action="actionUrl"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                    >
                    <a-button> <a-icon type="upload" /> Upload </a-button>
                </a-upload>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import * as Api from '@/apis/mediaApi';

export default {    
    props: ['value'],
    mounted () {
        this.onInit(this.value);
    },
    computed: {
        iconAvatar() {
            return (this.loading) ? 'loading' : 'user';
        }
    },
    data(){
        return {
            actionUrl: Api.getUrlUploadImage(),
            loading: false,
            imageUrl: null,
            inputValue: ''
        }
    },
    methods: {
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                this.onInit(info.file.response);
            }
        },
        onInit(file){
            //console.log('val', file);
            if(file.url){
                this.inputValue = file;
                this.imageUrl = Api.getUrl(this.inputValue.url);
                this.loading = false;

                this.$emit('input', this.inputValue);                
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
