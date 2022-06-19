<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

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
                        <a-button type="primary"  @click="aDrawerShow">
                            Add category
                        </a-button>
					</a-col>
				</a-row>
			</template>

            <a-row type="flex" justify="center" align="top">
                <a-col :span="23">
                    <a-table :columns="columns" :data-source="data">
                        <a slot="action"  href="javascript:;">Delete</a>
                        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                        {{ record.description }}
                        </p>
                    </a-table>
                </a-col>
            </a-row>            
            
		</a-card>
		<!-- User Profile Card -->	
        <a-drawer
            title="Create a new account"
            :width="720"
            :visible="visibleDrawerForm"
            :body-style="{ paddingBottom: '80px' }"
            :maskClosable="false"
            :closable="false"
            >
            <a-form :form="form" layout="vertical"  @submit="handleSubmit">
                <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Name">
                    <a-input
                        v-decorator="[
                        'name',
                        {
                            rules: [{ required: true, message: 'Please enter user name' }],
                        },
                        ]"
                        placeholder="Please enter user name"
                    />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Url">
                    <a-input
                        v-decorator="[
                        'url',
                        {
                            rules: [{ required: true, message: 'please enter url' }],
                        },
                        ]"
                        style="width: 100%"
                        addon-before="http://"
                        addon-after=".com"
                        placeholder="please enter url"
                    />
                    </a-form-item>
                </a-col>
                </a-row>
                <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Owner">
                    <a-select
                        v-decorator="[
                        'owner',
                        {
                            rules: [{ required: true, message: 'Please select an owner' }],
                        },
                        ]"
                        placeholder="Please a-s an owner"
                    >
                        <a-select-option value="xiao">
                        Xiaoxiao Fu
                        </a-select-option>
                        <a-select-option value="mao">
                        Maomao Zhou
                        </a-select-option>
                    </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Type">
                    <a-select
                        v-decorator="[
                        'type',
                        {
                            rules: [{ required: true, message: 'Please choose the type' }],
                        },
                        ]"
                        placeholder="Please choose the type"
                    >
                        <a-select-option value="private">
                        Private
                        </a-select-option>
                        <a-select-option value="public">
                        Public
                        </a-select-option>
                    </a-select>
                    </a-form-item>
                </a-col>
                </a-row>
                <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item label="Approver">
                    <a-select
                        v-decorator="[
                        'approver',
                        {
                            rules: [{ required: true, message: 'Please choose the approver' }],
                        },
                        ]"
                        placeholder="Please choose the approver"
                    >
                        <a-select-option value="jack">
                        Jack Ma
                        </a-select-option>
                        <a-select-option value="tom">
                        Tom Liu
                        </a-select-option>
                    </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="DateTime">
                    <a-date-picker
                        v-decorator="[
                        'dateTime',
                        {
                            rules: [{ required: true, message: 'Please choose the dateTime' }],
                        },
                        ]"
                        style="width: 100%"
                        :get-popup-container="trigger => trigger.parentNode"
                    />
                    </a-form-item>
                </a-col>
                </a-row>
                <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Description">
                    <a-textarea
                        v-decorator="[
                        'description',
                        {
                            rules: [{ required: true, message: 'Please enter url description' }],
                        },
                        ]"
                        :rows="4"
                        placeholder="please enter url description"
                    />
                    </a-form-item>
                </a-col>
                </a-row>
            
                <div
                    :style="{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    zIndex: 1,
                    }"
                >
                    <a-popconfirm
                        title="Are you sure cancel?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="aDrawerClose"
                    >
                        <a-button :style="{ marginRight: '8px' }" >
                            Cancel
                        </a-button>
                    </a-popconfirm>
                    
                    <a-button type="primary" html-type="submit">
                        Submit
                    </a-button>
                </div>
            </a-form>
        </a-drawer>
	</div>
</template>

<script>
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
    ];

    const data = [
        {
            key: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
            key: 3,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
    ];

	export default ({
		components: {
		},
		data() {
			return {
                form: this.$form.createForm(this, { name: 'coordinated' }),
                visibleDrawerForm: false,
                data,
                columns,
				// Active button for the "User Profile" card's radio button group.
				profileHeaderBtns: 'overview',
			}
		},
        methods: {           
            afterVisibleChange(val){
                console.log('visible', val);
            },
            aDrawerShow() {
                console.log(this.$models.categorys.create());
                this.visibleDrawerForm = true;
            },
            aDrawerClose() {
                this.visibleDrawerForm = false;              
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                    console.log('Received values of form: ', values);
                    }
                });
            }   
        },
	})

</script>

<style lang="scss">
</style>