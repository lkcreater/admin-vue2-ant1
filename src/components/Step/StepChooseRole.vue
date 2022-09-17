<template>
    <a-row>
        <a-col span="24" style="padding: 0 15px;">
            <a-table 
                class="table-settings-notifications" 
                :pagination="false"
                :columns="columns" 
                :data-source="data"
                rowKey="id">

                <template slot="action" slot-scope="text, record">
                    <a-switch @change="onChange" v-model="model[record.id]" :value="record.id" :data-name="record.name" />
                </template>

            </a-table>
        </a-col>

    </a-row>
</template>

<script>

const columns = [
    {
        title: 'Role',
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' },
    },
    {
        title: 'Action',
        key: 'action',
        width: '15%',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    data() {
        return {
            data: [],
            columns,
            model: [],
            respons: [],
        };
    },
    mounted () {
        this.onProviderData();
    },
    methods: {
        onProviderData(){
            this.$models.role.findAll().then((res)=>{
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
        },
        onChange(checked, e) {
            const name = e.target.getAttribute('data-name');
            const id = e.target.value;
            if(checked == true){
                this.respons.push({
                    id: id,
                    name: name
                });
            }else{
                const index = this.respons.findIndex(item => item.id === id);
                this.respons.splice(index, 1);
            }
            //console.log(this.respons);
        },
        onSubmitForm(){
            if(this.respons.length == 0){
                this.$notification.error({
                    message: 'Alert Role',
                    description: 'Please choose role',
                });
                return {
                    status: 'error',
                    models: []
                }
            }else{
                return {
                    status: 'process',
                    models: this.respons
                }
            }
        }
    },
}
</script>

<style >
.table-settings-notifications thead>tr>th span.ant-table-column-title{
    font-size: 16px;
    color: #8c8c8c;
    font-weight: 400;
    padding: 12px 4px;
}

.table-settings-notifications td {
    color: #141414;
    margin-bottom: 2px;
    font-size: 14px;
}
</style>