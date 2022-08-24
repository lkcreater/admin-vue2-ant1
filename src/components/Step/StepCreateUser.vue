<template>
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: '0 0 50px 0' }">
        <template #title>
            <a-row type="flex" align="middle">
                <a-col :span="24" >
                    <h5 class="font-semibold m-0 text-center">Form Create User</h5>
                </a-col>
            </a-row>
        </template>

        <div style="margin-top: 20px; padding: 0 100px;">
            <a-steps :current="current" :status="status" style="margin-top: 50px">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" :sub-title="item.subTitle" :description="item.description" />
            </a-steps>

            <div class="steps-content">
                <component v-if="steps[current].component != null" :is="steps[current].component" :ref="steps[current].component"></component>            
            </div>

            <div class="steps-action">
                <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                    Next
                </a-button>
                <a-button
                    v-if="current == steps.length - 1"
                    type="primary"
                    @click="$message.success('Processing complete!')"
                    >
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

export default {
    components: {
        StepUserPassword,
        StepFormProfile,
        StepChooseRole,
        StepFinish
    },
    data() {
        return {
            current: 0,
            status: 'process',
            steps: [
                {
                    title: 'First',
                    subTitle: 'Left 00:00:08',
                    description: 'create username and password',
                    component: 'StepUserPassword',
                    data: []
                },
                {
                    title: 'Second',
                    subTitle: 'Left 00:00:08',
                    description: 'fill in personal information',
                    component: 'StepFormProfile',
                    data: []
                },
                {
                    title: 'Third',
                    subTitle: 'Left 00:00:08',
                    description: 'choose a role',
                    component: 'StepChooseRole',
                },
                {
                    title: 'Last',
                    subTitle: 'Left 00:00:08',
                    description: 'Finish',
                    component: 'StepFinish',
                },
            ],
        }
    },
    methods: {
        next() {

            // step 1
            // if(this.current == 0){
            //     this.AppStep().first();
            // }else if(this.current == 1){
            //     this.AppStep().second();
            // }
            this.current++;

            

        },
        prev() {
            this.current--;
        },
        AppStep(){
            let keyRefsId = this.steps[this.current].component;
            return {
                first: async () => {         
                    const { status, models } = await this.$refs[keyRefsId].onSubmitForm();  
                    this.status = status;
                    if(this.status == 'process'){
                        this.current++
                    }
                },
                second: () => {

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