<template>
    <div class="clearfix">
        <!-- begin modal cropper -->
        <a-modal 
            title="Edit Thumbnail"
            width="60%"
            v-model="visibleModal"      
            :maskClosable="false"
            :afterClose="onCloseModal"
            okText="Insert"
            @ok="onModalSubmit"
            >
            <a-row v-if="imgObject">
                <a-col span="24">

                    <!-- vue cropper -->
                    <vue-cropper
                        style="max-width: 100%; max-height: 600px;"
                        :aspectRatio="16/9"
                        ref="cropper"
                        :src="imgObject.blob"
                        alt="Source Image"                        
                        >
                    </vue-cropper>
                    <!-- end vue copper -->

                    <!-- btn edit cropper -->
                    <div class="clearfix" style="margin-top: 15px; text-align: center;" >
                        <a-tooltip placement="top" title="rotate 90">
                            <a-button type="dashed" shape="circle" icon="redo" class="mr-10" @click="$refs.cropper.rotate(90)"/>
                        </a-tooltip>
                        <a-tooltip placement="top" title="rotate -90">
                            <a-button type="dashed" shape="circle" icon="undo" class="mr-10" @click="$refs.cropper.rotate(-90)"/>
                        </a-tooltip>
                        <a-tooltip placement="top" title="scale X">
                            <a-button type="dashed" shape="circle" icon="column-width" class="mr-10" @click="toggleScaleX"/>
                        </a-tooltip>
                        <a-tooltip placement="top" title="scale Y">
                            <a-button type="dashed" shape="circle" icon="column-height" class="mr-40"  @click="toggleScaleY"/>
                        </a-tooltip>

                        <a-tooltip placement="top" title="zoom in">
                            <a-button type="dashed" shape="circle" icon="zoom-in" class="mr-10"  @click="$refs.cropper.relativeZoom(0.1)"/>
                        </a-tooltip>
                        <a-tooltip placement="top" title="zoom out">
                            <a-button type="dashed" shape="circle" icon="zoom-out" class="mr-40"  @click="$refs.cropper.relativeZoom(-0.1)"/>
                        </a-tooltip>                        

                        <a-tooltip placement="top" title="move">
                            <a-button type="dashed" shape="circle" icon="drag" class="mr-10" @click="$refs.cropper.setDragMode('move')"/>
                        </a-tooltip> 
                        <a-tooltip placement="top" title="Reset">
                            <a-button type="dashed" shape="circle" icon="sync" @click="$refs.cropper.reset()"/>
                        </a-tooltip>                           
                    </div>
                    <!-- end edit cropper -->                    
                </a-col>
            </a-row>            
        </a-modal>
        <!-- end modal cropper -->

        <!-- start thumbnail -->
        <a-row type="flex" justify="center">
            <a-col>

                <!-- preview thumbnail -->
                <div v-if="!imagePreview">                    
                    <div class="thumbnail-picture-card">                    
                        <span role="button" tabindex="0" class="ant-upload">
                            <div>                            
                                <i aria-label="icon: plus" class="anticon anticon-plus">
                                    <a-icon style="font-size: 30px" type="picture" theme="filled" />
                                </i>
                                <div class="ant-upload-text">
                                    thumbnail
                                </div>
                            </div>
                        </span>                    
                    </div>                                       
                </div>
                
                <div v-else>
                    <img :src="imagePreview" class="thumbnail-picture-card-img" alt="">
                </div>
                <!-- end preview thumbnail -->

                <div class="text-label-typefile">
                    <span>Type file: jpeg, jpe, jpg, gif, png, webp</span>
                </div> 
                <a-row type="flex" justify="end">
                    <a-col span="12" style="text-align: right; padding-right: 10px;">
                        <file-upload                     
                            ref="uploadFile"            
                            @input="handleInput"
                            @input-file="inputFile"
                            @input-filter="inputFilter"
                            >
                            <a-button type="dashed">
                                Select
                            </a-button>
                        </file-upload>
                    </a-col>
                    <a-col span="12">
                        <a-button type="danger" :disabled="!modelObject" @click="onDeleteFile">
                            Cancel
                        </a-button>
                    </a-col>
                </a-row>
                    
                    
            </a-col>
        </a-row>   
        <!-- end thumbnail  -->
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import VueCropper from 'vue-cropperjs';
import FileUpload from 'vue-upload-component'

export default {
    components: {
        FileUpload,
        VueCropper
    },    
    props: ['value','srcPreview'],
    mounted() {
        if(this.srcPreview){
            this.imagePreview = this.srcPreview;
        }
        // if (this.value) {
        //     console.log('file: ', this.value);
        //     this.files = this.value;
        // }
    },
    data() {
        return {
            files: this.value,
            imgObject: null,
            imagePreview: null,
            modelObject: null,
            visibleModal: false,
            scaleX: true,
            scaleY: true
        };
    },
    methods: {
        inputFilter: function (newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Filter non-image file
                if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                    this.$message.error('Invalid type file: jpeg|jpe|jpg|gif|png|webp');
                    return prevent()
                }                
            }

            // Create a blob field
            newFile.blob = this.createBlobUrl(newFile.file);
        },
        createBlobUrl(file){
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                return  URL.createObjectURL(file)
            }
        },
        handleInput (value) {
            this.files = value;
            this.$emit('input', this.files);
        },        
        inputFile: function (newFile, oldFile) {    
            //set object file update
            this.imgObject = newFile;

            // open modal
            if (newFile && !oldFile) {
                this.visibleModal = true;
            }  
        },
        onModalSubmit() {
            const {id , data} = this.fnConvertDataUrlToFile();            

            // set preview thumbnail
            this.imagePreview = data.blob;

            // update file upload
            this.modelObject = this.$refs.uploadFile.update(id, data);

            // close modal
            this.visibleModal = false;
        },
        onCloseModal(){
            this.imgObject = null;            
        },
        fnConvertDataUrlToFile(){
            if(this.$refs.cropper && this.imgObject){
                let elementCropper = this.$refs.cropper;
                let elementImage = this.imgObject;
                let data = {
                    name: this.imgObject.name,
                    error: '',
                }

                let binStr = atob(elementCropper.getCroppedCanvas().toDataURL(elementImage.type).split(',')[1]);
                let arr = new Uint8Array(binStr.length)
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                data.file = new File([arr], data.name, { type: elementImage.type })
                data.blob = this.createBlobUrl(data.file);
                data.size = data.file.size;

                return {
                    id: elementImage.id,
                    data: data
                };
            }else{
                this.$message.error('Convert dataUrl error!');
            }
        },
        toggleScaleX(){
            this.scaleX = !this.scaleX;
            let num = this.scaleX ? 1 : -1;
            this.$refs.cropper.scaleX(num);
        },
        toggleScaleY(){
            this.scaleY = !this.scaleY;
            let num = this.scaleY ? 1 : -1;
            this.$refs.cropper.scaleY(num);
        },
        reset(){
            this.onDeleteFile();
        },
        onDeleteFile(){
            // console.log('files', this.files);
            // console.log('imgObject', this.imgObject);
            // console.log('imagePreview', this.imagePreview);
            // console.log('modelObject', this.modelObject);

            this.files = null;
            this.imgObject = null;
            this.imagePreview = null;
            this.modelObject = null;
            this.$emit('input', []);
        }
    },
}
</script>

<style>
.text-label-typefile span{
    font-size: 12px;
    color: #d9d9d9;
}
.thumbnail-picture-card-img{
    max-width: 200px;
}
.thumbnail-picture-card{
    display: table;
    float: left;
    width: 200px;
    height: 150px;
    margin-right: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;    
    border-radius: 4px;
    transition: border-color 0.3s ease;
}
.file-uploads label[for="file"]{    
    cursor: pointer;
}
.thumbnail-picture-card .ant-upload {
    display: table-cell;
    width: 100%;
    height: 100%;
    padding: 8px;
    text-align: center; 
    vertical-align: middle;
}
</style>