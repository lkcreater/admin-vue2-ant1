<template>
    <div>
        <a-row v-if="label != null">
            <a-col>
                <div class="ant-col ant-form-item-label">
                    <label class="ant-form-item-no-colon">{{ label }}</label>
                </div> 
            </a-col>
        </a-row>
        <a-row>
            <a-col>
                <quill-editor 
                    ref="text-editor-quill" 
                    class="ant-text-quill-editor" 
                    v-model="inputVal"
                    :options="quillOptions" 
                    :style="{ height: height + 'px', marginBottom: '45px'}"
                    >
                </quill-editor>
            </a-col>
        </a-row>        
    </div>
</template>

<script>
import 'quill/dist/quill.core.css' ;
import 'quill/dist/quill.snow.css' ;
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    props: {
        value:{
            type: String,
            default: ''
        },
        label:{
            type: String,
            default: null
        },
        height:{
            type: String,
            default: '150'
        }
    },
    computed: {
        inputVal:{
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        editor() {
            return this.$refs['text-editor-quill'].quill;
        }
    },
    mounted() {
        //console.log('this is current quill instance object', this.editor)
    },
    data() {
        return {
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
    }
}
</script>

<style>
.ant-text-quill-editor .ql-toolbar{
    border: 1px solid #d9d9d9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.ant-text-quill-editor .ql-container{
    border: 1px solid #d9d9d9;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.ant-text-quill-editor .ql-editor.ql-blank::before {
    color: rgb(0 0 0 / 32%);
    content: attr(data-placeholder);
    font-style: normal;
    font-size: 14px;
    font-weight: bold;
    color: #cfcfcf;
    letter-spacing: 1px;
}
</style>