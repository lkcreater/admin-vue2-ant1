<template>
    <div>
        <a-form-model
        ref="components-form"
        :model="forms"
        :rules="rules"
        >
            <a-row type="flex" justify="space-between" style="margin-bottom: 15px; padding-right: 12px; padding-left: 15px;">
                <a-col>
                    <a-button type="dashed" shape="circle" @click="$router.push({ path: '/posts' })">
                        <a-icon type="double-left" theme="outlined" /> 
                    </a-button>
                </a-col>
                <a-col>
                    <a-button type="primary" @click="handleValidateSubmit" style="margin-right: 15px;">
                        {{ (edit.status == false) ? 'Submit' : 'Update' }}
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
                            <p>Enter content to post</p>	
                        </template>

                        <a-alert
                            v-if="edit.status == true"
                            message="You are editing now."
                            type="info"
                            show-icon
                            style="margin-bottom: 15px;" >

                            <div slot="description" v-html="edit.desc"></div>
                        </a-alert>
                        
                        <a-form-model-item  class="mb-10 pd-input" label="Title" :colon="false" prop="title">
                            <a-input size="small" v-model="forms.title" placeholder="Title" />
                        </a-form-model-item >

                        <a-row>
                            <a-col :md="18">
                                <a-form-item class="pd-input mb-10" label="Slug" :colon="false">
                                    <a-input size="small" v-model="forms.slug"  placeholder="Slug url" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6">
                                <a-form-item class="pd-input mb-10" label="Public date" :colon="false">
                                    <a-date-picker size="small" v-model="forms.public_date_at" show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
                                </a-form-item>                            
                            </a-col>
                        </a-row>

                        <a-row class="mb-10">
                            <a-col :md="24" class="pd-input" style="padding-bottom: 40px;">
                                <text-quill-editor label="Content" v-model="forms.content" height="200"></text-quill-editor>                  
                            </a-col>
                        </a-row>

                        <a-row class="mb-10">
                            <a-col :md="24" class="pd-input" >
                                <a-form-item class="mb-10" label="Content excerpt" :colon="false">
                                    <a-textarea
                                        v-model="forms.content_excerpt"
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
                    <!-- thumbnail section -->
                    <a-card :bordered="false" class="header-solid h-full mb-24">
                        <template #title>
                            <h6 class="font-semibold">Thumbnail</h6>			
                            <p>Picture of the content</p>	
                        </template>

                        <a-row>
                            <a-col>
                                <div class="clearfix">
                                    <file-upload-thumbnail ref="fileUploadObject" v-model="forms.file" :src-preview="edit.thumbnail"></file-upload-thumbnail>

                                </div>
                            </a-col>                        
                        </a-row>
                    </a-card>

                    <!-- category section -->
                    <a-card :bordered="false" class="header-solid h-full mb-24">
                        <template #title>
                            <a-row>
                                <a-col span="14">
                                    <h6 class="font-semibold">Category</h6>			
                                    <p>List Categories</p>
                                </a-col>
                                <a-col span="10" style="text-align: right;">
                                    <a-button type="link" @click="onOpenFormNewCategory">New category</a-button>
                                </a-col>
                            </a-row>
                                
                        </template>

                        <a-row>
                            <a-col style="padding:10px; height: 200px; overflow: scroll;">
                                <a-checkbox-group @change="onSelectCategory" v-model="forms.selectCategory">
                                    <a-row>
                                        <a-col :span="24" v-for="item in dataCateory" :key="item.id">
                                            <a-checkbox :value="item.id" >
                                                {{ item.title }}
                                            </a-checkbox>
                                        </a-col>                                   
                                    </a-row>
                                </a-checkbox-group>
                            </a-col>                        
                        </a-row>
                    </a-card>

                    <a-card :bordered="false" class="header-solid h-full mb-24">
                        <template #title>
                            <a-row>
                                <a-col>
                                    <h6 class="font-semibold">Tags</h6>			
                                    <p>List Tags</p>
                                </a-col>
                            </a-row>                                
                        </template>

                        <a-row>
                            <a-col>
                                <span v-for="tag in forms.tags" :key="tag.id">
                                    <a-tag :color="tag.color" closable @close="handleRemoveTag(tag)" style="margin: 3px;">
                                        {{ tag.title }}
                                    </a-tag>
                                </span>

                                <span>
                                    <a-input
                                        v-if="inputVisible"
                                        ref="input"
                                        type="text"
                                        size="small"
                                        :style="{ width: '90px' }"                                        
                                        @keyup.enter="handleInputConfirmTag($event.target.value)"
                                        />
                                    <a-tag v-else style="background: #fff; borderStyle: dashed; padding-left: 10px; margin-left:5px" @click="showInputNewTag">
                                        <a-icon type="plus" /> New Tag
                                    </a-tag>
                                </span>
                                <div class="clearfix"></div>

                                
                            </a-col>                        
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
        
        </a-form-model>

        <a-modal 
            v-model="objectSuccessForm.visible" 
            :maskClosable="false"
            :closable="false"
            :footer="null"
            >
            <a-result
                status="success"
                title="Successfully Submit to server"
                >
                <template #extra>
                    <h4>  Go to posts page in {{ objectSuccessForm.countDown }}</h4>
                    <a-button key="buy" @click="successFormClose">
                        Create Form Again
                    </a-button>
                </template>
            </a-result>
        </a-modal>

        <form-category ref="idFormCategory" @create-success="onCreateCategorySuccess"></form-category>
    </div>
</template>

<script>
import TextQuillEditor from '@/components/Form/TextQuillEditor';
import FileUploadThumbnail from '@/components/Form/FileUploadThumbnail';
import FormCategory from '@/components/Categorys/FormCategory';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

var instanceModels = function() {
    return {
        title: '',
        slug: '',
        public_date_at: moment(),
        content: '',
        content_excerpt: '',
        file: [],
        selectCategory: [],
        tags: []
    }
}

export default {
    components: {
        TextQuillEditor,
        FileUploadThumbnail,
        FormCategory
    },
    data() {
        return {
            forms: instanceModels(),
            rules: {
                title: [
                    { required: true, message: 'Please input Title', trigger: 'blur' },
                ]
            },
            objectSuccessForm : {
                visible: false,
                countDown: 5,
                fnInterval: ''
            },

            edit: {
                status: false,
                thumbnail: '',
                desc: ''
            },

            /* provider data */
            dataCateory: [],

            /* tags sector */
            inputVisible: false,
        };
    },
    mounted() {        
        this.setUpdateItem();
        this.getQueryDataCategory();
    },
    methods: {
        setUpdateItem(){
            if(this.$route.params.item){
                console.log(this.$route.params);
                const { id, title, slug, public_date_at, content, content_excerpt, options, tags, categorys } = this.$route.params.item;

                let image = '';
                if(options.image && options.image.length > 0){
                    const [ {url} ] = options.image;
                    image = this.$models.url(url);
                }
                
                // setup status
                this.edit = {
                    status: true,
                    thumbnail: image,
                    desc: '<b>POST : </b>' + title
                }               

                let valCate = (categorys) ? categorys.map((ele) => ele.cate_id) : [];

                let valTags = (tags) ? tags.map(tag => {
                    return {
                        id: tag.tag_id,
                        title: tag.tag_title,
                        color: this.genRandomColorTag(),
                        isNewRecord: false
                    };
                }) : [];

                // setup forms
                this.forms = {
                    title: title,
                    slug: slug,
                    public_date_at: public_date_at,
                    content: unescape(content),
                    content_excerpt: content_excerpt,
                    file: [],
                    selectCategory: valCate,
                    tags: valTags
                }

                return 'update';
            }
        },
        async getQueryDataCategory(){
            await this.$models.categorys.findAll().then((res)=>{
                if(res.status == 200){ 
                    this.dataCateory = res.data.result;
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        handleValidateSubmit(){         
            this.$refs['components-form'].validate( async (valid) => {                
                if(valid){

                    this.sendDataFormPost();

                    return false;
                }
                return false;                
            });
        },
        async sendDataFormPost(){

            var formData = new FormData();      
            for (const [key, value] of Object.entries(this.forms)) {                
                if(key === 'file'){                   
                    let file = (value.length > 0) ? value[0].file : null;
                    formData.append(key, file);
                }else if(key === 'selectCategory' || key === 'tags'){
                    formData.append(key, JSON.stringify(value));                    
                }else{ 
                    formData.append(key, value);
                }
            }      
            
            await this.$models.post.create(formData).then((res)=>{
                if(res.status == 200){
                    this.resetForm();
                    this.successFormOpen();
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            }); 
        },
        resetForm(){
            Object.assign(this.forms, instanceModels());
            this.$refs.fileUploadObject.reset();
        },
        onChange(){

        },
        onOk(){

        },

        /**********************/
        //** modal success sector
        successFormOpen(){
            this.objectSuccessForm.visible = true;

            this.objectSuccessForm.fnInterval = setInterval(() => {
                this.objectSuccessForm.countDown --;

                if(this.objectSuccessForm.countDown == 0){
                    clearInterval(this.objectSuccessForm.fnInterval);
                    this.successFormGoToListPage();
                }
            }, 1000);            
        },
        successFormGoToListPage(){
            this.$router.push('/posts');
        },
        successFormClose(){
            clearInterval(this.objectSuccessForm.fnInterval);
            this.objectSuccessForm.visible = false;
            this.objectSuccessForm.countDown = 5;
        },


        /**********************/
        //** category sector
        onSelectCategory(selectValues){            
            this.forms.selectCategory = selectValues;
        },
        onOpenFormNewCategory(){
            this.$refs.idFormCategory.aDrawerShow(null);
        },
        onCreateCategorySuccess(item){
            this.dataCateory.unshift(item);
        },

        /**********************/
        //** tags sector
        genRandomColorTag(){
            let color = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];

            return color[Math.floor((Math.random()*color.length))];
        },        
        showInputNewTag() {
            this.inputVisible = true;
            this.$nextTick(function() {
                this.$refs.input.focus();
            });
        },
        handleInputConfirmTag(val) {

            // add new tag
            let tags = this.forms.tags;
            if(val && !tags.find((ele) => ele.title === val)){
                let create_new_tag = {
                    id: uuidv4(),
                    title: val,
                    color: this.genRandomColorTag(),
                    isNewRecord: true
                };

                this.forms.tags = [...tags, create_new_tag];
            }

            // reset object
            Object.assign(this, {
                inputVisible: false,
            });
        },
        handleRemoveTag(removedTag) {
            const tags = this.forms.tags.filter(tag => tag.title !== removedTag);
            //console.log(tags);
            this.forms.tags = tags;
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