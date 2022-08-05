<template>
    <div>
        <a-row style="margin-top: 20px">
            <a-col>
                <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: '0px 0px 50px 0px'}">
                    <template #title>
                        <a-row type="flex" align="middle">
                            <a-col :span="24" :md="12">
                                <h5 class="font-semibold m-0">Posts Table</h5>
                            </a-col>
                            <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">                                

                                <a-radio-group  size="small">
                                    <a-radio-button value="all">ALL</a-radio-button>
                                    <a-radio-button value="online">ONLINE</a-radio-button>
                                </a-radio-group>

                                <a-button type="primary" size="small" style="margin-left: 15px;" @click="$router.push({ path: '/posts/form' })">
                                    <a-icon type="plus-circle" theme="filled" />
                                    Create new post
                                </a-button>
                            </a-col>
                        </a-row>
                    </template>

                    <a-table 
                        :columns="columns" 
                        :row-key="record => record.id"
                        :data-source="dataModels"
                        :pagination="pagination"
                        :loading="loading"
                        @change="handleTableChange"
                        :row-selection="rowSelection"
                        >

                        <template slot="name" slot-scope="text">
                            <router-link :to="{ path: 'post/view', params: { userId: '123' }}">{{ text }}</router-link>                            
                        </template> 

                        <template slot="categorys" slot-scope="text, record">  
                            <a-badge
                                v-for="ele in text"
                                :key="ele.cate_id"
                                :count="ele.cate_title"
                                :number-style="{
                                    marginRight: '5px',
                                    backgroundColor: '#fff',
                                    color: '#999',
                                    boxShadow: '0 0 0 1px #d9d9d9 inset',
                                }"
                            />                     
                        </template>

                        <template slot="public_date_at" slot-scope="text, record">  
                            {{ getFormateDate(text) }}                   
                        </template>

                        <template slot="published" slot-scope="text, record">    
                            <a-popconfirm title="Sure to active?" @confirm="onChangeActive(record)">      
                                <a-tag v-if="text == 1" color="#87d068">
                                    Active
                                </a-tag>     
                                <a-tag v-if="text == 0" color="#f50">
                                    Deactive
                                </a-tag> 
                            </a-popconfirm>   
                        </template>

                        <template slot="action" slot-scope="record">     
                            <a-button type="dashed" size="small" style="margin-right: 5px" @click="btnEditData(record)">
                                Edit
                            </a-button> 
                            <a-popconfirm  @confirm="deleteItem(record)">
                                <template slot="title">
                                    <div>Sure to delete ?</div> 
                                    <span style="font-size: 12px; color: #9d9d9dc9;"> {{ record.title }}} </span>
                                </template>
                                <a-button type="danger" size="small" >
                                    Del
                                </a-button>
                            </a-popconfirm>    
                        </template>

                    </a-table>

                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
const columns = [
    {
        dataIndex: 'title',
        key: 'title',
        title: 'Title',
        scopedSlots: { customRender: 'name' },
    },
    {
        title: 'Categories',
        dataIndex: 'categorys',
        key: 'categorys',
        width: '20%',
        scopedSlots: { customRender: 'categorys' },
    },
    {
        title: 'Date',
        dataIndex: 'public_date_at',
        key: 'public_date_at',
        width: '15%',
        scopedSlots: { customRender: 'public_date_at' },
    },
    {
        title: 'Published',
        key: 'published',
        dataIndex: 'published',
        width: '10%',
        scopedSlots: { customRender: 'published' },
    },
    {
        title: 'Action',
        key: 'action',
        width: '15%',
        scopedSlots: { customRender: 'action' },
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

import $ from 'jquery';
import moment from 'moment';

export default {
    data(){
        return {
            show: true,
            columns,
            loading: false,
            dataModels: [],
            pagination: {},
            rowSelection,
            setPager: 1,
        }
    },
    mounted(){
        this.fetch(1);
    },
    methods: {
        async deleteItem(item){
            await this.$models.post.delete(item.id).then((res)=>{
                if(res.status == 200){ 
                    this.fetch(this.setPager);
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        async fetch(page){
            this.setPager = page;

            this.loading = true;
            await this.$models.post.findAll(page).then((res)=>{
                if(res.status == 200){ 
                    const { record, meta } = res.data.result;
                    this.loading = false;
                    this.dataModels = record;

                    const pagination = { ...this.pagination };
                    pagination.total = meta.currentRow;
                    pagination.pageSize = meta.limit;
                    this.pagination = pagination;

                    console.log(this.dataModels);
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        handleTableChange(pagination, filters, sorter) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;

            this.fetch(pager.current);
        },
        getFormateDate(date){
            return moment(date).format("MMMM Do YYYY, h:mm a");
        },
        async onChangeActive({id, published}){
            const active = (published == 1) ? 0 : 1;
            await this.$models.post.active(id, {published: active}).then((res)=>{
                if(res.status == 200 && res.data.result == true){ 
                    this.setToggleActive(id, active);
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        testJquery(){
            this.show = !this.show;
            if(this.show){
                $('#block-show-jquery').show(300);
            }else{
                $('#block-show-jquery').hide(300);
            }
        },
        setToggleActive(id, active){
            let data = this.dataModels;
            data = data.map((item) => {
                if(id == item.id){
                    item.published = active;
                    return item;
                }else{
                    return item;
                }
            });
            this.$nextTick(() => {
                this.dataModels = data;
            });
        }
    }
}
</script>

<style scoped>

.ant-pagination.ant-table-pagination{
    margin-right: 100px !important;
}
</style>