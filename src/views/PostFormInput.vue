<template>
    <a-form-model
        class="lk-form-custom"
        ref="formRules"
        :model="form"
        :rules="rules">

        <a-row>
            <a-col :md="8" :sm="24" style="padding: 0 12px;">
                <CardImageInput
                    v-model="form.image"
                    :edit-file="true"
                    title="Post Image">
                </CardImageInput>

                <div style="margin-top: 24px;">
                    <CardChooseCate v-model="form.categorys">                    
                    </CardChooseCate>
                </div>                 
            </a-col>
            <a-col :md="16" :sm="24" style="padding: 0 12px;">
                <!-- box form -->
                <a-card :bordered="false" class="header-solid h-full">
                    <h5>{{ titleInfoContent }}</h5>

                    <a-row>                        
                        <!-- title -->
                        <a-col class="lk-col-left" span="14">                            
                            <a-form-model-item :colon="false" label="Title" prop="title">
                                <a-input size="small" v-model="form.title" placeholder="please enter title" />
                            </a-form-model-item >
                        </a-col>

                        <!-- slug -->
                        <a-col span="10">                            
                            <a-form-model-item :colon="false" label="Slug" >
                                <a-input size="small" v-model="form.slug" placeholder="please enter slug" />
                            </a-form-model-item >
                        </a-col>
                    </a-row>

                    <a-row>
                        <!-- Content excerpt -->
                        <a-col class="lk-col-left" span="14">
                            <a-form-item :colon="false" label="Content excerpt" >
                                <a-textarea
                                    v-model="form.content_excerpt"
                                    placeholder="Please enter a short article about 2 - 3 lines."
                                    :auto-size="{ minRows: 2, maxRows: 5 }">
                                </a-textarea> 
                            </a-form-item>
                        </a-col>

                        <!-- Public date -->
                        <a-col span="10">
                            <a-form-item class="pd-input mb-10" label="Public date" :colon="false">
                                <a-date-picker 
                                    size="small" 
                                    v-model="form.public_date_at" 
                                    show-time 
                                    placeholder="Select Time" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <!-- text editor -->
                    <a-row>
                        <a-col>
                            <TextQuillEditor 
                                label="Content" 
                                height="150"
                                v-model="form.content">
                            </TextQuillEditor>
                        </a-col>
                    </a-row>   
                    
                    <a-row>
                        <a-col style="padding-top: 5px;">
                            <InputTagsSelect
                                placeholder="please enter tags">
                            </InputTagsSelect>
                        </a-col>
                    </a-row>
                    
                </a-card>
                
                <div style="margin-top: 24px;">
                    <a-row>
                        <a-col class="lk-col-r24" :span="12">
                            <CardGallery v-model="form.gallery"></CardGallery>
                        </a-col>
                        <a-col :span="12">
                            <CardAttachment></CardAttachment>
                        </a-col>
                    </a-row>                                      
                </div>

            </a-col>
        </a-row>

    </a-form-model>
</template>

<script>
import CardImageInput from '@/components/Post/CardImageInput';
import CardChooseCate from '@/components/Post/CardChooseCate';
import InputTagsSelect from '@/components/Post/InputTagsSelect';
import CardGallery from '@/components/Post/CardGallery';
import CardAttachment from '@/components/Post/CardAttachment';
import TextQuillEditor from '@/components/Inputs/TextQuillEditor';
import moment from 'moment';

var initForm = function() {
    return {
        image: '',
        title: '',
        slug: '',
        public_date_at: '',
        content: '',
        content_excerpt: '',
        categorys: [],
        tags: [],
        gallery: [],
        files: [],        
    }
}
export default {
    components: {
        CardImageInput,
        CardChooseCate,
        CardGallery,
        InputTagsSelect,
        CardAttachment,
        TextQuillEditor
    },
    computed: {
        titleInfoContent() {
            return 'Post Information'
        }
    }, 
    mounted () {
        this.startSetupForm();
    },  
    data(){
        return {
            form: initForm(),
            rules: {}
        }
    },
    methods: {
        startSetupForm() {
            this.form.public_date_at = moment()
        }
    },
}
</script>

<style lang="scss" scoped>

</style>