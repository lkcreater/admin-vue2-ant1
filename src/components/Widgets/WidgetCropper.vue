<template>
    <div>
        <a-modal    
            v-if="useModal === true"    
            :width="850"
            :visible="visible"
            :maskClosable="false"
            :closable="false"
            okText="Crop"
            @ok="uploadImage"
            @cancel="handleCancel"> 

            <div id="lk-widget-modal-cropper"></div>
        </a-modal> 

        <Teleport to="#lk-widget-modal-cropper" :disabled="useModal === false">
            <Cropper
                class="cropper"
                ref="cropper"
                :src="image"
                :stencil-props="{ aspectRatio: 14/9 }">
            </Cropper>

            <!-- btn edit cropper -->
            <div class="clearfix" style="margin-top: 15px; text-align: center;" >
                <a-tooltip placement="top" title="rotate 90">
                    <a-button type="dashed" shape="circle" icon="redo" class="mr-10" @click="$refs.cropper.rotate(90)"/>
                </a-tooltip>
                <a-tooltip placement="top" title="rotate -90">
                    <a-button type="dashed" shape="circle" icon="undo" class="mr-10" @click="$refs.cropper.rotate(-90)"/>
                </a-tooltip>
                <a-tooltip placement="top" title="scale X">
                    <a-button type="dashed" shape="circle" icon="column-width" class="mr-10" @click="flip(true, false)"/>
                </a-tooltip>
                <a-tooltip placement="top" title="scale Y">
                    <a-button type="dashed" shape="circle" icon="column-height" class="mr-40"  @click="flip(false, true)"/>
                </a-tooltip>

                <a-tooltip placement="top" title="zoom in">
                    <a-button type="dashed" shape="circle" icon="zoom-in" class="mr-10"  @click="$refs.cropper.zoom(2)"/>
                </a-tooltip>
                <a-tooltip placement="top" title="zoom out">
                    <a-button type="dashed" shape="circle" icon="zoom-out" class="mr-40"  @click="$refs.cropper.zoom(0.5)"/>
                </a-tooltip>      

                <a-tooltip placement="top" title="Reset">
                    <a-button type="dashed" shape="circle" icon="sync" @click="$refs.cropper.reset()"/>
                </a-tooltip>                           
            </div>
        </Teleport>

    </div>
</template>

<script>
import Teleport from 'vue2-teleport';
import * as Api from '@/apis/mediaApi';
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
    components: {
        Cropper,
        Teleport
    }, 
    props: {
        value:{
            type: [String, Object]
        },
        useModal:{
            type: Boolean,
            default: true
        },
        visible: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        visible:function(newVal, oldVal){
            if(newVal == true){
                this.$nextTick(() => {
                    this.data(this.value);
                })                
            }
        }
    },
    data() {
        return {
            image: '',//'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        }
    },
    methods: {
        uploadImage(event) {
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const form = new FormData();
				canvas.toBlob( async (blob) => {
					form.append('file', blob);

                    const respone =  await Api.uploadImage(form);
                    if(respone.status == 200){
                        this.$emit('input', respone.data);
                        this.$emit('success', respone.data);
                    }
				}, 'image/jpeg');
			}
		},
        data(file){
            //console.log(file);
            if(file){
                this.image = Api.getUrl(file.url);
            }
        },
        handleCancel(e) {  
            this.$refs.cropper.reset();
            this.$emit('update:visible', false);
        },
        flip(x, y) {
			if (this.$refs.cropper.imageTransforms.rotate % 180 !== 0) {
				this.$refs.cropper.flip(!x, !y);
			} else {
				this.$refs.cropper.flip(x, y);
			}
		},
    },
}
</script>