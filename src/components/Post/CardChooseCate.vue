<template>
    <div>
        <a-card :bordered="false" class="header-solid h-full">
            <a-row>
                <a-col :span="16">
                    <h5>{{ title }}</h5>
                </a-col>
                <a-col :span="8">
                    <a-button size="small" type="dashed" style="float: right;" @click="onOpenForm(null)">
                        <a-icon type="form" />
                        Add
                    </a-button>
                </a-col>
            </a-row>
            
            <div class="lk-block-overflow">
                <a-checkbox-group v-model="model" @change="onChangeSelect">
                    <a-row v-for="item in listModels" :key="item.id">
                        <a-col>
                            <a-checkbox :value="item.id"> {{ item.title }} </a-checkbox>
                        </a-col>                
                    </a-row>
                </a-checkbox-group>
            </div>
        </a-card>

        <DrawerFormCategory 
            ref="form-category" 
            @success="onSuccess">
        </DrawerFormCategory>
    </div>
</template>

<script>
import DrawerFormCategory from '@/components/Categorys/DrawerFormCategory';
import * as Api from '@/apis/categoryApi'

export default {
    components: {
        DrawerFormCategory,
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: 'Choose Categories' 
        },
    },
    watch: {
        'value': function(newVal, oldVal){
            this.data(newVal);
        }  
    },
    data() {
        return {
            model: [],
            listModels: []
        }
    },
    mounted () {
        this.data(this.value);
        this.onLoadList();
    },
    methods: {
        async onLoadList(){
            const respone = await Api.findList();
            if(respone.status == 200){
                this.listModels = respone.data;
            }
        },
        data(value){
            this.model = value;
        },
        onChangeSelect(choose){
            this.$emit('input', choose);
        },
        onOpenForm(items){
            this.$refs['form-category'].openForm(items);
        },
        onSuccess(){
            this.onLoadList();
        }
    },
}
</script>

<style>
.lk-block-overflow{
    margin-top: 10px;
    height: 250px;
    padding: 15px;
    border: 1px solid #d9d9d9;
    overflow: auto;
}

.lk-block-overflow .ant-checkbox-wrapper span{
    font-size: 14px;
    line-height: 26px;
}
</style>