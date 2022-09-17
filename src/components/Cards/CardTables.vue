<template>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">

		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">{{ title }}</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					
                    <slot name="action"></slot>

				</a-col>
			</a-row>
		</template>
        
        <slot 
            name="table" 
            :data="dataModels"
            :loading="loading"
            :pagination="pagination"
            :on-chanepage="handleTableChangePage">
        </slot> 

	</a-card>
</template>

<script>
import { Api } from "@/apis/api";

export default ({
    props: {
        title: {
            type: String,
            default: 'Title',
        },
        columns: {
            type: Array,
            default: () => [],
        },
        method: {
            type: String,
            default: 'get',
        },
        url: { 
            type: String,
        },
        page: {
            type: Boolean,
            default: true,
        },
        searchObject: {
            type: Object,
            default: () => {},
        },
    },
    watch: { 
        searchObject: function(newVal, oldVal) {
            this.fetch(1);
            return newVal;
        },
    },
    mounted () {
        this.fetch(1);
    }, 
    data() {
        return {
            dataModels: [],
            pagination: {},
            loading: false,
            currentPage: 1,
        }
    },       
    methods: {
        async fetch(page){
            // setup utility
            this.currentPage = page;
            this.loading = true;

            // setup params api and setup search
            const params = this.queryParams({
                page: this.currentPage,
                ...this.searchObject
            });

            // call api
            const respone = await Api(this.method, `${this.url}?${params}`, { 
                params: { page: this.currentPage } 
            });
            if(respone.status == 200){

                // setup utility after call api
                const { record, meta } = respone.data;
                this.dataModels = record;
                this.loading = false;                
                
                // setup pagination
                if(this.page){
                    const pagination = { ...this.pagination };
                    pagination.current = this.currentPage;
                    pagination.total = meta.maxRow;
                    pagination.pageSize = meta.limit;

                    // set page
                    this.pagination = pagination;
                }else{
                    this.pagination = false;
                }

                // log
                //console.log(this.pagination, respone.data);
            }
        },
        handleTableChangePage(pagination, filters, sorter) {
            console.log('page', pagination)
            if(this.page){
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;

                this.fetch(pager.current);
            }
        },
        queryParams(object){
            return new URLSearchParams(object).toString();
        },
        reload(){
            this.fetch(this.currentPage);
        }
    },
})
</script>