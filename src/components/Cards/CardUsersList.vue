<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">{{ title }}</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="authorsHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">ONLINE</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table 
            :columns="columns" 
            :data-source="data" 
            :pagination="false"
            rowKey="id">

			<template slot="author" slot-scope="text, record">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="url(record.image)" />
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
				<p class="m-0 font-regular text-muted">{{ getDate(record) }}</p>
			</template>

			<template slot="editBtn" slot-scope="row">
				<!-- <a-button type="link" :data-id="row.key" class="btn-edit">
					Edit
				</a-button> -->
			</template>

		</a-table>
	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>
const tableColumns = [
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
];

import moment from 'moment';

const $log = (...args) => {
    //console.log(...args);   
}

export default ({
	props: {
        title: {
            type: String,
            default: 'Users Table'
        },
		columns: {
			type: Array,
			default: () => tableColumns,
		},
	},
	data() {
		return {
			authorsHeaderBtns: 'all',
			data: []
		}
	},
	mounted () {
		this.onDataProvider();
	},
	methods: {        
		async onDataProvider() {
			await this.$models.user.all().then((res)=>{
                if(res.status == 200){
                    this.data = res.data.result.record;
                    $log('data == ', res.data);
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            }); 
		},
		url(image){
			return (image) ? this.$models.url(image.url) : '';
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
        getDate(data){
            return moment(data).format("MMM Do YY");
        }
	},
})

</script>