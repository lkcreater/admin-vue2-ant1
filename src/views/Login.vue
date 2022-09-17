<template>
    <div>
        <a-row>
            <a-col :span="12" :offset="6" >
                <a-card :bordered="false" class="header-solid h-full" >
                    <template #title>
                        <a-row type="flex" align="middle">
                            <a-col :span="24" :md="12">
                                <h5 class="font-semibold m-0">Authors Table</h5>
                            </a-col>
                            <a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
                                <a-radio-group v-model="authorsHeaderBtns" size="small">
                                    <a-radio-button value="all">ALL</a-radio-button>
                                    <a-radio-button value="online">ONLINE</a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                    </template>
                </a-card>
            </a-col>
        </a-row>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>