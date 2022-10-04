<template>
    <a-card :bordered="false" class="header-solid h-full">
        <h5>{{ title }}</h5>

        <div class="lk-upload-list">
            <a-upload
                :headers="$store.getters['auth/setHeader']"
                :multiple="true"
                :action="urlApi"
                :file-list="fileLists"
                @change="handleChange">
                <a-button size="small" type="dashed"> 
                    <a-icon type="upload" /> 
                    Upload File Attachment
                </a-button>
                <br>
                <span style="font-size: 13px; color: #adaaaa">
                    File Attachment : {{ typeFile.join(', ') }}
                </span>
            </a-upload>
        </div>
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
            default: 'Post Attachment'
        },
    },
    mounted () {
        this.data(this.value);
    },
    data() {
        return {
            typeFile: ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'png', 'jpg', 'jpeg'],
            urlApi: Api.getUrlUpload(),
            loading: false,
            fileLists: [],
        };
    },
    methods: {
        data(files){
            if(files){
                let fileList = [];
                fileList = files.map(file => this.convertObject(file))
                this.fileLists = fileList;
            }
        },
        handleChange(info) {
            let fileList = [...info.fileList];

            fileList = fileList.map(file => {
                if (file.response) {
                    file = this.convertObject(file.response, file.status);
                }
                return file;
            });
            this.fileLists = fileList;

            // emit to input
            let models = [];
            this.fileLists.forEach(item => models.push(item.file));
            this.$emit('input', models);
        },
        convertObject(file, status='done'){
            return {
                uid: file.filename,
                name: file.originalname,
                status: status,
                url: Api.getUrl(file.url),
                file: file
            };
        }
    },
}
</script>