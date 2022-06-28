<template>
    <a-form
        id="components-form"
        :form="form"
        @submit="handleSubmit"
        >

        <a-row type="flex" justify="end" style="margin-bottom: 15px; padding-right: 12px;">
            <a-col>
                <a-button type="primary" style="margin-right: 15px;">
                    Submit
                </a-button>
                <a-button>
                    Cancel
                </a-button>
            </a-col>
        </a-row>

        <a-row>
            <a-col :md="18" :sm="24" style="padding: 0px 12px">
                <a-card :bordered="false" class="header-solid h-full mb-24">
                    <template #title>
                        <h6 class="font-semibold">Content Info</h6>			
                        <p>Architects design houses</p>	
                    </template>
                    
                    <a-form-item class="mb-10 pd-input" label="Title" :colon="false">
						<a-input 
                        size="small"
						v-decorator="[
						'title',
						{ rules: [{ required: true, message: 'Please input your title!' }] },
						]" placeholder="Title" />
					</a-form-item>

                    <a-row>
                        <a-col :md="18">
                            <a-form-item class="pd-input mb-10" label="Slug" :colon="false">
                                <a-input 
                                size="small"
                                v-decorator="['slug']" 
                                placeholder="Slug url" />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6">
                            <a-form-item class="pd-input mb-10" label="Public date" :colon="false">
                                <a-date-picker size="small" show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
                            </a-form-item>                            
                        </a-col>
                    </a-row>

                    <a-row class="mb-10">
                        <a-col :md="24" class="pd-input" style="padding-bottom: 40px;">
                            <text-quill-editor label="Content" v-model="quillContent" height="200"></text-quill-editor>                  
                        </a-col>
                    </a-row>

                    <a-row class="mb-10">
                        <a-col :md="24" class="pd-input" >
                            <a-form-item class="mb-10" label="Content excerpt" :colon="false">
                                <a-textarea
                                    placeholder="Autosize height with minimum and maximum number of lines"
                                    :auto-size="{ minRows: 3, maxRows: 6 }"
                                    >
                                </a-textarea> 
                            </a-form-item>                                           
                        </a-col>
                    </a-row>

                </a-card>
            </a-col>
            <a-col :md="6" :sm="24" style="padding: 0px 12px">
                <a-card :bordered="false" class="header-solid h-full mb-24">
                    <template #title>
                        <h6 class="font-semibold">Thumbnail</h6>			
                        <p>Picture of the content</p>	
                    </template>

                    <a-row>
                        <a-col>
                            <div class="clearfix">
                                <file-upload-thumbnail v-model="files" src-preview=""></file-upload-thumbnail>
                            </div>
                        </a-col>                        
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        
    </a-form>
</template>

<script>
import TextQuillEditor from '@/components/Form/TextQuillEditor';
import FileUploadThumbnail from '@/components/Form/FileUploadThumbnail';

export default {
    components: {
        TextQuillEditor,
        FileUploadThumbnail
    },
    data() {
        return {
            form: this.$form.createForm(this, { name: 'form_post' }),
            // Quill editor html content.
            quillContent: '<p>sdsdsddsfdsfd</p>',
            files: [],
        };
    },
    mounted() {
        console.log(this.files);
    },
    methods: {
        handleSubmit(){

        },
        onChange(){

        },
        onOk(){

        },
        
    },
}
</script>

<style scoped>
.pd-input{
    padding-left: 12px; 
    padding-right: 12px;
}
</style>