<template>
	<div>

		<!-- Header Background Image -->
		<div class="profile-nav-bg-short" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}">
			<template #title>
				<a-row type="flex" align="middle">					
					<a-col :span="24" style="display: flex; align-items: center; justify-content: flex-end">
                        <a-button type="primary"  @click="$refs.idFormCategory.aDrawerShow()">
                            Add category
                        </a-button>
					</a-col>
				</a-row>
			</template>

            <a-row type="flex" justify="center" align="top">
                <a-col :span="23">
                    <a-table :columns="columns" :data-source="data" :rowKey="(record)=>record.id">
                        <a slot="action"  href="javascript:;">Delete</a>
                        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                        {{ record.desc }}
                        </p>
                    </a-table>
                </a-col>
            </a-row>            
            
		</a-card>
		<!-- User Profile Card -->	

        <form-category ref="idFormCategory"></form-category>
	</div>
</template>

<script>
import FormCategory from '@/components/Categorys/FormCategory';

export default ({
    components: {
        FormCategory
    },
    data() {
        return {           
            columns: [
                { title: 'Title', dataIndex: 'title', key: 'title' },
                { title: 'Slug', dataIndex: 'slug', key: 'slug' },
                { title: 'Detail', dataIndex: 'desc', key: 'desc' },
                { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
            ], 
            data: [],           
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
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        }
    },
});
</script>