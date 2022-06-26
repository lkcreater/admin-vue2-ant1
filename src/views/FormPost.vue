<template>
    <a-form
        id="components-form"
        :form="form"
        @submit="handleSubmit"
        >

        <a-row>
            <a-col :md="18" :sm="24">
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
                            <div class="ant-col ant-form-item-label">
                                <label class="ant-form-item-no-colon"> Content</label>
                            </div>                                 
                            <quill-editor ref="text-editor-quill" v-model="quillContent" :options="quillOptions" style="height: 150px;"></quill-editor>                   
                        </a-col>
                    </a-row>
                    
                    <a-button @click="test">click</a-button>
                </a-card>
            </a-col>
            <a-col></a-col>
        </a-row>
        
    </a-form>
</template>

<script>
import 'quill/dist/quill.core.css' ;
import 'quill/dist/quill.snow.css' ;
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            form: this.$form.createForm(this, { name: 'form_post' }),
            // Quill editor html content.
            quillContent: '<p>Some initial <strong>bold</strong> text</p>',

            // Quill editor options.
            quillOptions: {
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
                        ['clean'],
                    ]
                },
            },
        };
    },
    methods: {
        test(){
            let editor = this.$refs['text-editor-quill'].quill;
            let indexCursor = editor.getSelection().index;
            editor.clipboard.dangerouslyPasteHTML(indexCursor, '<img src="https://nodei.co/npm/vue-quill-editor.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">')
        },
        handleSubmit(){

        },
        onChange(){

        },
        onOk(){

        }
    },
}
</script>

<style scoped>
.pd-input{
    padding-left: 12px; 
    padding-right: 12px;
}
.ql-toolbar.ql-snow,
.ql-container.ql-snow {
    border: 1px solid #bfbfbf;
}
</style>