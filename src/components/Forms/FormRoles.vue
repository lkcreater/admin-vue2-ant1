<template>
    <div>
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
            <template #title>
                <a-row type="flex" align="middle">
                    <a-col :span="24" :md="12">
                        <h5 class="font-semibold m-0">{{ titleHeadRole }}</h5>
                    </a-col>
                    <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
                        <a-button type="dashed" @click="showDrawer">
                            <a-icon type="profile" />
                            Edit list role
                        </a-button>
                    </a-col>
                </a-row>
            </template>

            

                <a-form-model 
                    ref="ruleForm" 
                    :model="form" 
                    :rules="rules">

                    <a-row>
                        <a-col style="padding-left: 25px; padding-right: 25px;">
                            <a-alert
                                v-if="isUpdate == true"
                                message="The program is: Edit mode."
                                type="info"
                                show-icon
                                style="margin-bottom: 15px;" >
                            </a-alert>
                        </a-col>
                    </a-row>

                    <a-row>
                        <a-col :span="8" style="padding-left: 25px;">                           

                            <a-form-model-item label="Role name" prop="rolename">
                                <a-input size="small" v-model="form.rolename" placeholder="input placeholder role name" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>

                    <a-row>
                        <a-col>

                            <a-checkbox-group @change="onChange" v-model="form.select" style="display: block;">
                                <a-table 
                                    :columns="columns" 
                                    :data-source="data" 
                                    :pagination="false">

                                    <template slot="role" slot-scope="text, record">
                                        {{ text }}
                                    </template>

                                    <template slot="action" slot-scope="text, record">
                                        <a-row>
                                            <a-col v-for="(item, index) in record.val" :key="index" span="3">
                                                <a-checkbox :value="item.value">{{item.name}}</a-checkbox>
                                            </a-col>
                                        </a-row>                        
                                    </template> 

                                </a-table>
                            </a-checkbox-group>

                            <a-form-model-item prop="select" style="padding-left: 25px;"> 
                            </a-form-model-item>

                        </a-col>
                    </a-row>    
                    
                    <a-row>
                        <a-col>
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                                <a-button type="primary" @click="onSubmit">
                                    {{ btnSubmitRole }}
                                </a-button>
                                <a-button style="margin-left: 10px;" @click="resetForm">
                                    {{ btnResetRole }}
                                </a-button>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                        
                </a-form-model>

        </a-card>

        <a-drawer
            title="Role name"
            placement="right"
            :width="300"
            :closable="false"
            :visible="visible"
            @close="onClose">

            <a-row>
                <a-col v-for="item in listRoles" :key="item.id">
                    <table>
                        <tbody>
                            <tr>
                                <td><b>{{ item.name }}</b></td>
                                <td width="20%">
                                    <a-button v-if="item.is_admin == false" type="link" @click="onEditRole(item)">
                                        Edit
                                    </a-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr class="gradient-line" />
                </a-col>
            </a-row>
        </a-drawer>
    </div>
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
        this.onLoadRoles();
    },
    computed:{
        btnSubmitRole(){
            return (this.isUpdate == false) ? 'Create Role' : 'Update Role';
        },
        btnResetRole(){
            return (this.isUpdate == false) ? 'Reset' : 'Cancel';
        },
        titleHeadRole(){
            return (this.isUpdate == false) ? 'Create User Roles' : 'Edit Role: ' + this.form.rolename;
        }
    },
    data() {
        return {
            data: [],  
            visible: false, 
            isUpdate: false,   
            roleId: null,      
            form: {
                rolename: '',
                select: [],
            },
            rules: {
                rolename: [{ required: true, trigger: 'blur' }],      
                select: [{ required: true, trigger: 'blur' }],     
            },
            listRoles: []
        }
    }, 
    methods: {
        onStartApp(){
            const data = (this.dataTable.length > 0) ? this.dataTable : this.$models.role.getList();
            this.data = data.map((item, index) => {
                item.key = index;       
                item.val = item.items.map(element => { 
                    return { 
                        name: element, 
                        value: item.role + '.' + element
                    }
                });       
                return item;
            });            
        },
        onChange(checkedValues) {
            this.$emit('change', checkedValues);
        },
        onSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    let attrib = {
                        name: this.form.rolename,
                        items: this.form.select
                    }

                    if(this.isUpdate == false){
                        this.$models.role.create(attrib).then((res)=>{
                            if(res.status == 200){                                 
                                this.resetForm();
                                this.$notification.success({
                                    class: 'noti-custom-success',
                                    message: 'Notification, Submit form!',
                                    description: 'The system has sent the information to the server successfully.',
                                });
                            }                         
                        })
                        .catch((err) => {
                            this.$notification.error({
                                message: err.message,
                                description: err.response.statusText,
                            });
                        });
                    }else{
                        this.$models.role.update(this.roleId, attrib).then((res)=>{
                            if(res.status == 200){                                 
                                this.resetForm();
                                this.onLoadRoles();
                                this.$notification.success({
                                    class: 'noti-custom-success',
                                    message: 'Notification, Submit form!',
                                    description: 'The system has sent the information to the server successfully.',
                                });
                            }                         
                        })
                        .catch((err) => {
                            this.$notification.error({
                                message: err.message,
                                description: err.response.statusText,
                            });
                        });
                    }
                    
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            if(this.isUpdate == true){
                this.roleId = null;
                this.isUpdate = false;
            }
            this.$refs.ruleForm.resetFields();
        },
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
        onLoadRoles(){
            this.$models.role.findAll().then((res)=>{
                if(res.status == 200){ 
                    this.listRoles = res.data.result;
                }                         
            })
            .catch((err) => {
                this.$notification.error({
                    message: err.message,
                    description: err.response.statusText,
                });
            });
        },
        onEditRole(role){
            this.isUpdate = true;
            this.roleId = role.id;
            this.form = {
                rolename: role.name,
                select: role.items,
            };
            this.onClose();
        },
    },
}
</script>

<style lang="scss" >

</style>