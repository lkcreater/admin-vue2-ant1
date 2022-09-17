<template>
    <div>
        <CardTables
            :url="url">     

            <template 
                slot="table" 
                slot-scope="scope">
               
                <a-table
                    row-key="id" 
                    :columns="columns"                     
                    :data-source="scope.data" 
                    :pagination="scope.pagination"
                    @change="scope.onChanepage">	

                    <!-- <template slot="author" slot-scope="author">
                        <div class="table-avatar-info">
                            <a-avatar shape="square" :src="author.avatar" />
                            <div class="avatar-info">
                                <h6>{{ author.name }}</h6>
                                <p>{{ author.email }}</p>
                            </div>
                        </div>
                    </template>

                    <template slot="func" slot-scope="func">
                        <div class="author-info">
                            <h6 class="m-0">{{ func.job }}</h6>
                            <p class="m-0 font-regular text-muted">{{ func.department }}</p>
                        </div>
                    </template>

                    <template slot="status" slot-scope="status">
                        <a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
                            {{ status ? "ONLINE" : "OFFLINE" }}
                        </a-tag>
                    </template>

                    <template slot="editBtn" slot-scope="row">
                        <a-button type="link" :data-id="row.key" class="btn-edit">
                            Edit
                        </a-button>
                    </template> -->
                </a-table>      
            </template>      

        </CardTables>
    </div>
</template>

<script>
import CardTables from '@/components/Cards/CardTables';
const table1Columns = [
    {
        title: 'TITLE',
        dataIndex: 'title',
        scopedSlots: { customRender: 'author' },
    },
    {
        title: '',
        scopedSlots: { customRender: 'editBtn' },
        width: 50,
    },
];

import { urlFindAll } from "@/apis/categoryApi"

export default {
    components: {
        CardTables,
    },
    data(){
        return {
            columns: table1Columns,
            url: urlFindAll
        }
    }
}
</script>