<template>
    <a-row>
        <a-col :span="14" :offset="5">
            <a-steps :current="currentStep">
                <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
                <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
            </a-steps>

            <a-card :bordered="false" class="header-solid h-full" style="margin-top: 70px;">
                <StepIntroProduct v-show="currentStep == 0" />

                
            </a-card>
        </a-col>
    </a-row>    
</template>

<script>
import StepIntroProduct from './stepForm/StepIntroProduct';

export default {
    components: {
        StepIntroProduct,
    },
    data() {
        return {
            currentStep: 0
        }
    }
}
</script>

<style lang="scss" scoped>

</style>