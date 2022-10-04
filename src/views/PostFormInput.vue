<template>
    <a-form-model
        class="lk-form-custom"
        ref="formRules"
        :model="form"
        :rules="rules"
        @submit="handleSubmit" 
        @submit.native.prevent>

        <a-row style="margin-bottom: 12px;">
            <a-col :span="12">
                <a-row type="flex" justify="start" >
                    <a-col style="padding-left: 12px;">
                        <a-button type="dashed" @click="$router.push({ path: '/posts' })">
                            <a-icon type="arrow-left" />
                            Back to Posts
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12">
                <a-row type="flex" justify="end" >
                    <a-col style="padding-right: 12px;">      
                        <a-popconfirm
                            title="Are you sure cancel?"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="confirmCancelForm">

                            <a-button type="dashed" :style="{ marginRight: '8px' }" >
                                <a-icon type="close" />
                                Cancel
                            </a-button>
                        </a-popconfirm>
                    
                        <a-button type="primary" html-type="submit">
                            <a-icon type="form" />
                            Submit
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        

        <a-row>
            <a-col :md="8" :sm="24" style="padding: 0 12px;">
                <a-form-model-item :colon="false" prop="image">
                    <CardImageInput
                        v-model="form.image"
                        :edit-file="true"
                        title="Post Image">
                    </CardImageInput>
                </a-form-model-item>

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
                                v-model="form.tags"
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
                            <CardAttachment v-model="form.files"></CardAttachment>
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
import * as Api from '@/apis/postApi';

var initForm = function() {
    return {
        image: '',
        title: '',
        slug: '',
        public_date_at: moment(),
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
    data(){
        return {
            editModel: null,
            form: initForm(),
            rules: {
                title: [
                    { required: true, trigger: 'blur' },
                ],
                image: [
                    { required: true, trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        async onSubmitApi(){
            if(this.editModel){
                // update record
                const respone = await Api.update(this.editModel.id, this.form);

                if(respone.status == 200){
                    this.$notification['success']({
                        class: 'noti-custom-success',
                        message: 'Notification Form',
                        description: `The Update Submit successfully.`,
                    });
                    this.$router.replace({ path: '/posts' });
                }
            }else{
                // new record
                const respone = await Api.add(this.form);

                if(respone.status == 200){
                    this.$notification['success']({
                        message: 'Notification Form',
                        description: `The Submit successfully.`,
                    });
                    this.$router.replace({ path: '/posts' });
                }
            }            
        },
        handleSubmit(e){
            e.preventDefault();
            this.$refs.formRules.validate(valid => {
                if (valid) {
                    this.onSubmitApi();
                } else {
                    return false;
                }
            });
            //console.log(this.form);
        },
        confirmCancelForm(){
            this.resetForm();
        },
        resetForm(){
            Object.assign(this.form, initForm());
        }
    },
}
</script>