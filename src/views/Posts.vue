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

                <a-button size="small" type="dashed" @click="onCreate()">
                    <a-icon type="form" />
                    Add post
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

                    <template slot="image" slot-scope="text, record">
                        <a-avatar 
                            class="lk-avatar"
                            shape="square" 
                            icon="camera"
                            style="height: 70px;"
                            :src="imageUrl(record.options.image)">
                        </a-avatar>
                    </template>

                    <template slot="contentPost" slot-scope="text, record">
                        <b>{{ record.title }}</b>
                        <div>{{ record.content_excerpt }}</div>
                    </template>

                    <template slot="createdAt" slot-scope="text, record">
                        {{ day(text) }}
                    </template>

                    <template slot="updatedAt" slot-scope="text, record">
                        {{ day(text) }}
                    </template>

                    <div slot="action" slot-scope="record">
                        <a-button type="dashed" size="small" style="margin-right: 5px" @click="onEdit(record)">
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
	</div>
</template>

<script>
import CardTables from '@/components/Cards/CardTables';
import CardDetail from '@/components/Post/CardDetail';
import * as Api from "@/apis/postApi"
import * as ApiMedia from "@/apis/mediaApi";
import moment from 'moment';

export default ({
    components: {
        CardTables,
        CardDetail
    },
    data() {
        return {     
            columns: [
                { 
                    title: 'Image', 
                    key: 'id', 
                    width: '10%',
                    scopedSlots: { customRender: 'image' }  
                },
                { 
                    title: 'Title', 
                    dataIndex: 'title', 
                    key: 'title', 
                    scopedSlots: { customRender: 'contentPost' }  ,  
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
            title: 'Posts Table',
            paramsObject: {}, 
        }
    },
    methods: {         
        async deleteItem(id){
            const respone = await Api.del(id);
            if(respone.status == 200){
                this.$refs['CardTables'].reload();
            }
        },
        onCreate(){
            this.$router.push({ path: '/posts/form' });
        },
        onEdit(item){

        },
        onSearch(val){
            this.paramsObject = {
                title: val
            }
        },
        onSuccess(){
            this.$refs['CardTables'].reload();
        },
        day(date){
            return moment(date).fromNow() //("MMM Do YY h:mm");
        },
        imageUrl(file){
            if(file){
                return ApiMedia.getUrl(file.url);
            }
        }
    },
});
</script>