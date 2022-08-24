<template>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" >
					<h5 class="font-semibold m-0">{{ title }}</h5>
				</a-col>
			</a-row>
		</template>

        
            <a-table 
                :columns="columns" 
                :data-source="data" 
                :pagination="false">

                <template slot="role" slot-scope="text, record">
                    {{ text }}
                </template>

                <template slot="action" slot-scope="text, record">
                    <a-row>
                        <a-col v-for="(item, index) in record.items" :key="index" span="3">
                            <a-checkbox @change="onChange"  :value="record.role + `.` +item">{{item}}</a-checkbox>
                        </a-col>
                    </a-row>                        
                </template> 

            </a-table>      

	</a-card>
</template>

<script>
const columns = [
    {
        key: 'role',
        dataIndex: 'role',        
        title: 'Role',
        scopedSlots: { customRender: 'role' },
    },
    {
        title: 'Action',
        key: 'action',
        width: '70%',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    props: {
        title: {
            type: String,
            default: 'User Roles',
        },
        columns: {
            type: Array,
            default: () => columns,
        },
        dataTable: {
            type: Array,
            default: () => [],
        },
    },
    mounted () {
        this.onStartApp();
    },
    data() {
        return {
            data: [],
            select: []
        }
    },    
    methods: {
        onStartApp(){
            const data = (this.dataTable.length > 0) ? this.dataTable : this.$models.role.getList();
            this.data = data.map((item, index) => {
                item.key = index;
                return item;
            });
        },
        onChange(e) {
            if(e.target.checked){
                this.select = [...this.select, e.target.value];
            }else{
                const index = this.select.indexOf(e.target.value);
                this.select.splice(index, 1);
            }
            this.$emit('change', [...new Set(this.select)]);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>