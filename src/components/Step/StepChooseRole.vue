<template>
    <a-row>
        <a-col span="24" style="padding: 0 15px;">
            <a-table 
                class="table-settings-notifications" 
                :pagination="false"
                :columns="columns" 
                :data-source="data">

                <template slot="action" slot-scope="text, record">
                    <a-switch @change="onChange" />
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
    {
        title: 'View',
        key: 'view',
        width: '15%',
        scopedSlots: { customRender: 'view' },
    },
];

const data = [
    {
        key: '1',
        name: 'Administrator',
    },
    {
        key: '2',
        name: 'Creator',
    },
    {
        key: '3',
        name: 'Read & Write',
    },
    {
        key: '4',
        name: 'Reader',
    },
];

export default {
    data() {
        return {
            data,
            columns,
        };
    },
    methods: {
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
        },
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