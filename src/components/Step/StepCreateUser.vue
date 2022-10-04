<template>
    <a-card :bordered="false" class="header-solid h-full" >
        <template #title>
            <a-row type="flex" align="middle">
                <a-col :span="24" >
                    <h5 class="font-semibold m-0 text-center">Form Create User</h5>
                </a-col>
            </a-row>
        </template>

        <div style="padding: 0 15px;">
            <a-steps :current="current" :status="status">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" :sub-title="item.subTitle" :description="item.description" />
            </a-steps>

            <div class="steps-content">
                <StepUserPassword  v-show="current == 0" ref="StepUserPassword"/> 
                <StepFormProfile v-show="current == 1" ref="StepFormProfile"/> 
                <StepChooseRole v-show="current == 2" ref="StepChooseRole"/> 
                <StepFinish v-show="current == 3" ref="StepFinish" :data="dataFinish" :is-done="isDone" @reload="reload"/>        
            </div>

            <div v-if="isDone == false" class="steps-action">
                <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                    Next
                </a-button>
                <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    @click="onSubmit">
                    Done
                </a-button>
                <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
                    Previous
                </a-button>
            </div>
        </div>
    </a-card>
</template>

<script>
import StepUserPassword from '@/components/Step/StepUserPassword';
import StepFormProfile from '@/components/Step/StepFormProfile';
import StepChooseRole from '@/components/Step/StepChooseRole';
import StepFinish from '@/components/Step/StepFinish';
import * as Api from '@/apis/userApi'

export default {
    components: {
        StepUserPassword,
        StepFormProfile,
        StepChooseRole,
        StepFinish
    },
    computed: {
        dataFinish(){
            return { ...this.model.step_1,  ...this.model.step_2, ...this.model.step_3 }
        } 
    },
    data() {
        return {
            current: 0,
            status: 'process',
            isDone: false,
            model: {
                step_1: {
                    username: '',
                    passeord: '',
                    repassword: ''
                },
                step_2: {
                    image: '',
                    firstname: '',
                    surename: '',
                    email: '',
                    phone: '',
                    birthday: '',
                    sex: ''
                },
                step_3: {
                    role: []
                }
            },
            steps: [
                {
                    title: 'First',
                    subTitle: '',
                    description: 'Setup username and password',
                    component: 'StepUserPassword',
                    data: []
                },
                {
                    title: 'Second',
                    subTitle: '',
                    description: 'Fill in personal information',
                    component: 'StepFormProfile',
                    data: []
                },
                {
                    title: 'Third',
                    subTitle: '',
                    description: 'Choose a role',
                    component: 'StepChooseRole',
                },
                {
                    title: 'Last',
                    subTitle: '',
                    description: 'Finish',
                    component: 'StepFinish',
                },
            ],
        }
    },
    methods: {
        reload(){
            this.$emit('reload');
        },
        async onSubmit(){
            let attribs = { ...this.model.step_1,  ...this.model.step_2, ...this.model.step_3 };
            console.log(attribs);
            const respone = await Api.create(attribs); 
            if(respone.status == 200){
                this.$message.success('Processing complete!');
                this.isDone = true;
            }
        },
        next() {
            // step 1
            if(this.current == 0){
                this.AppStep().first();
            }

            // step 2
            if(this.current == 1){
                this.AppStep().second();                        
            }

            // step 3
            if(this.current == 2){
                this.AppStep().third();
            }
        },
        prev() {
            this.current--;
        },
        AppStep(){
            return {
                first: async () => {         
                    const { status, models } = await this.$refs['StepUserPassword'].onSubmitForm();  
                    this.status = status;
                    if(this.status == 'process' && status == 'process'){
                        // set model
                        this.model.step_1 = {
                            username: models.username,
                            password: models.password,
                            repassword: models.repassword
                        }
                        this.current++                    
                    }
                },
                second: async () => {
                    const { status, models } = await this.$refs['StepFormProfile'].onSubmitForm();  
                    this.status = status;
                    if(this.status == 'process' && status == 'process'){
                        // set model
                        this.model.step_2 = models;
                        this.current++
                    }
                },
                third: async () => {
                    const { status, models } = await this.$refs['StepChooseRole'].onSubmitForm();  
                    this.status = status;
                    if(this.status == 'process' && status == 'process'){
                        // set model
                        this.model.step_3.role = models;
                        this.current++
                    }
                }
            }
        }
    },
}
</script>

<style scoped>
.steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
}

.steps-action {
    margin-top: 24px;
}
</style>