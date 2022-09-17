<template>
    <a-card :bordered="false" class="header-solid h-full">
        <h5>{{ title }}</h5>

        <div class="lk-upload-list">
            <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :default-file-list="defaultFileList">
                <a-button size="small" type="dashed"> 
                    <a-icon type="upload" /> 
                    Upload File Attachment
                </a-button>
            </a-upload>
        </div>
    </a-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Post Attachment'
        },
    },
    data() {
        return {
            defaultFileList: [
                {
                    uid: '1',
                    name: 'xxx.png',
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/xxx.png',
                },
                {
                    uid: '2',
                    name: 'yyy.png',
                    status: 'done',
                    url: 'http://www.baidu.com/yyy.png',
                },
                {
                    uid: '3',
                    name: 'zzz.png',
                    status: 'error',
                    response: 'Server Error 500', // custom error message to show
                    url: 'http://www.baidu.com/zzz.png',
                },
            ],
        };
    },
    methods: {
        handleChange({ file, fileList }) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
    },
}
</script>