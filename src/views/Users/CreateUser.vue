<template>
    <div>
        <a-row>
            <a-col :span="16" :offset="3">
                <StepCreateUser :key="key" @reload="reload"></StepCreateUser>
            </a-col>
        </a-row>        
    </div>
</template>

<script>
import StepCreateUser from '@/components/Step/StepCreateUser';

export default {
    components: {
        StepCreateUser,
    },
    data() {
        return {
            key: 0
        }
    },
    methods: {
        reload(){
            this.key ++;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>