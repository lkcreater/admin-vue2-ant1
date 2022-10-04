<template>
    <div class="lk-input-tags tags-field">
        <a-form-model-item :colon="false" :label="label">
            <a-select 
                v-model="model"
                size="small" 
                mode="tags" 
                :placeholder="placeholder"
                style="width: 100%"  
                :filter-option="false"
                :not-found-content="fetching ? undefined : null"
                @search="handleSearch"
                @change="handleChange">

                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <a-select-option v-for="data in dataList" :key="data.text">
                    {{ data.text }}
                </a-select-option>

            </a-select>
        </a-form-model-item>
    </div>
</template>

<script>
import * as Api from '@/apis/tagApi'
import _ from 'lodash'

export default {
    props: {
        value:{
            type: [Array, Object]
        },
        label: {
            type: String,
            default: 'Tags'
        },
        placeholder: {
            type: String,
            default: 'Tags Mode'
        },
    },
    mounted () {
        this.data(this.value);
    },
    data() {
        this.handleSearch = _.debounce(this.handleSearch, 800);

        return {
            dataList: [],
            model: [],
            fetching: false
        }
    },
    methods: {
        async handleSearch(txt){
            if(txt){
                this.fetching = true;
                const respone = await Api.searchTag(txt);
                if(respone.status == 200){
                    this.fetching = false;
                    this.dataList = respone.data.map(item => ({
                        text: item.title,
                        value: item.id
                    }));
                }
            }
        },
        handleChange(value) {            
            this.$emit('input', value);
        },
        data(value){
            this.model = value
        }
    },
}
</script>