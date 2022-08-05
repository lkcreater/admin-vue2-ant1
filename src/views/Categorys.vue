<template>
	<div>

		<!-- User Profile Card -->
        <a-row style="margin-top: 20px" >
            <a-col>
                <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: '0px 0px 50px 0px'}">
                    <template #title>
                        <a-row type="flex" align="middle">	
                            <a-col :span="24" :md="12">
                                <h5 class="font-semibold m-0">Categories Table</h5>
                            </a-col>

                            <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
                                <a-input-search placeholder="input search text" @search="onSearch" @keyup="onSearch($event.target.value)" style="max-width: 300px; margin-right:15px"/>
                                <a-button type="dashed"  @click="btnCreateData">
                                    Add category
                                </a-button>
                            </a-col>
                        </a-row>
                    </template>
                    
                    <a-table 
                        :columns="columns" 
                        :data-source="data" 
                        :rowKey="(record)=>record.id"                       
                        >

                        <div slot="action" slot-scope="record">
                            <a-button type="dashed" size="small" style="margin-right: 5px" @click="btnEditData(record)">
                                Edit
                            </a-button> 
                            <a-popconfirm title="Sure to delete?" @confirm="deleteItem(record)">
                                <a-button type="danger" size="small" >
                                    Del
                                </a-button>
                            </a-popconfirm>                                    
                        </div>

                        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                            <a-row>
                                <a-col span="12">
                                    <a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0}">
                                        <template #title>
                                            <h6 class="font-semibold m-0">{{ record.title }}</h6>
                                        </template>
                                        <a-descriptions :column="1">
                                            <a-descriptions-item label="Slug">
                                                {{ record.slug }}
                                            </a-descriptions-item>
                                            <a-descriptions-item label="Create date">
                                                {{ record.created_at }}
                                            </a-descriptions-item>
                                            <a-descriptions-item label="Update date">
                                                {{ record.updated_at }}
                                            </a-descriptions-item>
                                            <a-descriptions-item label="Details">
                                                {{ record.desc }}
                                            </a-descriptions-item>
                                        </a-descriptions>                                    
                                    </a-card> 
                                </a-col>
                            </a-row>
                                                    
                        </p>

                        <template slot="createdAt" slot-scope="text, record">
                            {{ getFormateDate(text) }}
                        </template>

                        <template slot="updatedAt" slot-scope="text, record">
                            {{ getFormateDate(text) }}
                        </template>

                    </a-table>                              
                    
                </a-card>
            </a-col>
        </a-row>
		
		<!-- User Profile Card -->	

        <form-category ref="idFormCategory" @create-success="onCreateSuccess" @update-success="onUpdateSuccess"></form-category>
	</div>
</template>

<script>
import FormCategory from '@/components/Categorys/FormCategory';
import moment from 'moment';

export default ({
    components: {
        FormCategory
    },
    data() {
        return {     
            columns: [
                { title: 'Title', dataIndex: 'title', key: 'title', filtered: true, width: '50%' },
                { title: 'Create date', dataIndex: 'created_at', key: 'created_at', scopedSlots: { customRender: 'createdAt' }, width: '17%' },
                { title: 'Update date', dataIndex: 'updated_at', key: 'updated_at', scopedSlots: { customRender: 'updatedAt' }, width: '17%' },
                { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, width: '16%' },
            ], 
            data: [],  
            backupData: [],   
            dataUpdate: null      
        }
    },
    mounted() {
        this.getQueryData();
    },
    methods: {
        async getQueryData(){
            await this.$models.categorys.findAll().then((res)=>{
                if(res.status == 200){ 
                    this.data = res.data.result;
                    this.backupData = this.data;
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        onSearch(val){
            if(val){
                this.data = this.data.filter((obj) => {                
                    return obj.title.toLowerCase().includes(val.trim().toLowerCase());
                });
            }else{
                this.data = this.backupData;
            }
        },
        deleteItem(obj){
            alert('del');
        },
        btnCreateData(){
            this.dataUpdate = null;
            this.$refs.idFormCategory.aDrawerShow(this.dataUpdate);
        },
        btnEditData(Object){
            this.dataUpdate = Object;
            this.$refs.idFormCategory.aDrawerShow(this.dataUpdate);
        },
        onCreateSuccess(item){
            // this.data.unshift(item);
            this.backupData.unshift(item);
        },
        getFormateDate(date){
            return moment(date).format("MMMM Do YYYY, h:mm a");
        },
        onUpdateSuccess(item){
            this.backupData = this.backupData.map((ele) => {
                if(ele.id === item.id){
                    return item;
                }
                return ele;                
            });
        }
    },
});
</script>