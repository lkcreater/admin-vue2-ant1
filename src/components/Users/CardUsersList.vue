<template>

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

                <template slot="author" slot-scope="text, record">
                    <div class="table-avatar-info">
                        <a-avatar shape="square" :src="urlImage(record.image)" />
                        <div class="avatar-info">
                            <h6>{{ record.firstname + ' ' + record.surename}}</h6>
                            <p>{{ record.email }}</p>
                        </div>
                    </div>
                </template>

                <template slot="func" slot-scope="text, record">
                    <div class="author-info">
                        <b class="m-0"><a-icon type="user" /> {{ record.username }}</b>
                        <p class="m-0 font-regular text-muted">{{ rolesToString(text) }}</p>
                    </div>
                </template>

                <template slot="status" slot-scope="record">
                    <a-tag class="tag-status" :class="record ? 'ant-tag-primary' : 'ant-tag-muted'">
                        {{ record ? "ACTIVE" : "DEACTIVE" }}
                    </a-tag>
                </template>

                <template slot="employed" slot-scope="record">
                    <p class="m-0 font-regular text-muted">{{ day(record) }}</p>
                </template>

                <template slot="editBtn" slot-scope="row">
                    <!-- <a-button type="link" :data-id="row.key" class="btn-edit">
                        Edit
                    </a-button> -->
                </template>

            </a-table>
        </template>

	</CardTables>

</template>

<script>
import CardTables from '@/components/Cards/CardTables';
import * as Api from '@/apis/userApi';
import moment from 'moment';

const $log = (...args) => {
    //console.log(...args);   
}

export default ({
    components: {
        CardTables,
    },
    computed: {
        title() {
            return 'Users Table'
        }
    },
	data() {
		return {
            columns: [
                {
                    title: 'PROFILE',
                    dataIndex: 'firstname',
                    scopedSlots: { customRender: 'author' },
                },
                {
                    title: 'USER/ROLES',
                    dataIndex: 'roles',
                    scopedSlots: { customRender: 'func' },
                },
                {
                    title: 'STATUS',
                    dataIndex: 'status',
                    scopedSlots: { customRender: 'status' },
                },
                {
                    title: 'REGIS DATE',
                    dataIndex: 'created_at',
                    scopedSlots: { customRender: 'employed' },
                },
                {
                    title: '',
                    scopedSlots: { customRender: 'editBtn' },
                    width: 50,
                },
            ],
            url: Api.getUrl(),
            paramsObject: {}, 
		}
	},
	methods: {    
        onSearch(val){
            this.paramsObject = {
                title: val
            }
        },
		urlImage(image){
			return (image) ? Api.getMedialUrl(image.url) : '';
		},
		rolesToString(roles){
			if(roles){
				let data = []
				roles.forEach(element => {
					data.push(element.name);
				});
				return data.join(', ');
			}
		}, 
        day(date){
            return moment(date).fromNow();
        },
	},
})

</script>