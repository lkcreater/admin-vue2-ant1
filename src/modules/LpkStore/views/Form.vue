<template>
    <a-form-model
        class="lk-form-custom"
        ref="formRules"
        :model="form"
        :rules="rules"
        @submit="handleSubmit" 
        @submit.native.prevent>

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
                    <CardChooseCate v-model="form.categorys" />        
                </div>                 
            </a-col>
            <a-col :md="16" :sm="24" style="padding: 0 12px;">
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

                </a-card>
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

const initForm = function() {
    return {
        image: '',
        title: '',
        slug: '',    
        categorys: []
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
        handleSubmit() {
            
        }
    },
}
</script>

<style lang="scss" scoped>

</style>