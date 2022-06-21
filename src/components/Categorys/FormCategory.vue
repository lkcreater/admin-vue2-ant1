.<template>
    <a-drawer
        :title="titleHeader"
        :width="550"
        :visible="visibleDrawerForm"
        :body-style="{ paddingBottom: '80px' }"
        :maskClosable="false"
        :closable="false"
        >

        <div v-if="resultStatus.show">
            <a-result   
                v-if="resultStatus.loading == false"                 
                status="success"
                title="Successfully create new record!"
                :sub-title="resultStatus.subTitle"
                >
                <template #extra>
                    <a-button key="close" type="primary" @click="aDrawerClose">
                        Close
                    </a-button>
                    <a-button key="create" @click="resetResultMessage">
                        Create Again
                    </a-button>
                </template>
            </a-result>

            <a-row v-else>
                <a-col :span="24" style="text-align: center; margin-top: 50px;">
                    <a-spin size="large" /><br/>
                    Loading...
                </a-col>
            </a-row>
        </div>

        <a-form v-else :form="form" layout="vertical"  @submit="handleSubmit">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Title">
                    <a-input
                        v-decorator="[
                        'title',
                        {
                            rules: [{ required: true, message: 'Please enter title' }],
                        },
                        ]"
                        placeholder="Please enter title"
                    />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Slug">
                    <a-input
                        v-decorator="[
                        'slug',
                        ]"
                        placeholder="Please enter slug"
                    />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-form-item label="Description">
                    <a-textarea
                        v-decorator="[
                        'desc',
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
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: 'coordinated' }),
            titleHeader: 'Create a new category',
            visibleDrawerForm: false,
            resultStatus: {
                loading: false,
                show: false,
                status: 'success',
                title: 'Successfully create new record!',
                subTitle: ''
            }
        }
    },
    methods: {           
        afterVisibleChange(val){
            console.log('visible', val);
        },
        aDrawerShow() {
            this.visibleDrawerForm = true;
        },
        aDrawerClose() {
            this.visibleDrawerForm = false;      
            this.resetResultMessage();        
        },
        handleSubmit(e) {
            e.preventDefault();

            this.form.validateFields( async (err, values) => {
                if (!err) {
                    this.resultStatus.show = true;
                    this.resultStatus.loading = true;
                    await this.$models.categorys.create(values).then((res)=>{
                        if(res.status == 200){
                            this.resultStatus.subTitle = res.data.result.title;
                            setTimeout(() => {
                                this.form.resetFields();
                                this.resultStatus.loading = false;
                            }, 500);   
                        }                         
                    })
                    .catch((err) => {
                        this.resultStatus.show = false;
                        this.resultStatus.loading = false;
                        this.$notification.error({
                            message: err.message,
                            description: err.response.statusText,
                        });
                    });                        
                }
            });
        },
        resetResultMessage(){
            this.resultStatus = {
                loading: false,
                show: false,
                status: 'success',
                title: this.resultStatus.title,
                subTitle: ''
            };
        }   
    },
}
</script>

<style>

</style>