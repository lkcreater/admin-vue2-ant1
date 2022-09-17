<template>
	<div>
        <CardTables
            ref="CardTables"
            :title="title"
            :url="url"
            :search-object="paramsObject">  

            <!-- slot action -->
            <template slot="action" >
                <a-input-search 
                    style="max-width: 300px; margin-right:15px"
                    size="small" 
                    placeholder="input search text" 
                    @search="onSearch" />

                <a-button size="small" type="dashed" @click="onOpenForm(null)">
                    <a-icon type="form" />
                    Add category
                </a-button>
            </template>
            <!-- slot action -->

            <!-- slot table -->
            <template  slot="table"  slot-scope="scope">            
                <a-table
                    row-key="id" 
                    :columns="columns"                     
                    :data-source="scope.data" 
                    :pagination="scope.pagination"
                    @change="scope.onChanepage">                             

                    <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                        <a-row>
                            <a-col span="12">
                                <a-descriptions title="Detail" :column="1" bordered>
                                    <a-descriptions-item label="Title">
                                        {{ record.title }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Slug">
                                        {{ record.slug }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Create date">
                                        {{ day(record.created_at) }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Update date">
                                        {{ day(record.updated_at) }}
                                    </a-descriptions-item>
                                    <a-descriptions-item label="Details">
                                        {{ record.desc }}
                                    </a-descriptions-item>
                                </a-descriptions>    
                            </a-col>
                        </a-row>                                                
                    </p>

                    <template slot="createdAt" slot-scope="text, record">
                        {{ day(text) }}
                    </template>

                    <template slot="updatedAt" slot-scope="text, record">
                        {{ day(text) }}
                    </template>

                    <div slot="action" slot-scope="record">
                        <a-button type="dashed" size="small" style="margin-right: 5px" @click="onOpenForm(record)">
                            <a-icon type="edit" />
                            Edit
                        </a-button> 
                        <a-popconfirm title="Sure to delete?" @confirm="deleteItem(record.id)">
                            <a-button type="danger" size="small" >
                                <a-icon type="delete" />
                                Del
                            </a-button>
                        </a-popconfirm>                                    
                    </div>
                </a-table>
            </template>   
            <!-- slot table -->

        </CardTables>                   

        <DrawerFormCategory 
            ref="form-category" 
            @success="onSuccess">
        </DrawerFormCategory>
	</div>
</template>

<script>
import CardTables from '@/components/Cards/CardTables';
import DrawerFormCategory from '@/components/Categorys/DrawerFormCategory';
import moment from 'moment';
import * as Api from "@/apis/categoryApi"

export default ({
    components: {
        DrawerFormCategory,
        CardTables,
    },
    data() {
        return {     
            columns: [
                { 
                    title: 'Title', 
                    dataIndex: 'title', 
                    key: 'title', 
                    filtered: true, 
                    width: '50%' 
                },
                { 
                    title: 'Create date', 
                    dataIndex: 'created_at', 
                    key: 'created_at', 
                    width: '17%',
                    scopedSlots: { customRender: 'createdAt' }  
                },
                { 
                    title: 'Update date', 
                    dataIndex: 'updated_at', 
                    key: 'updated_at',
                    width: '17%',
                    scopedSlots: { customRender: 'updatedAt' },  
                },
                { 
                    title: 'Action', 
                    dataIndex: '', 
                    key: 'x',  
                    width: '16%',
                    scopedSlots: { customRender: 'action' }, 
                },
            ], 
            url: Api.getUrl(),
            title: 'Categories Table',
            paramsObject: {}, 
        }
    },
    methods: {        
        onSearch(val){
            this.paramsObject = {
                title: val
            }
        },
        onOpenForm(items){
            this.$refs['form-category'].openForm(items);
        },
        async deleteItem(id){
            const respone = await Api.del(id);
            if(respone.status == 200){
                this.$refs['CardTables'].reload();
            }
        },
        onSuccess(){
            this.$refs['CardTables'].reload();
        },
        day(date){
            return moment(date).format("MMMM Do YYYY, h:mm a");
        },
    },
});
</script>