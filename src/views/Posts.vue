<template>
    <div>
        <a-row>
            <a-col span="12">
                <a-button type="primary" @click="$router.push({ path: '/form-post' })">
                    Create post
                </a-button>
            </a-col>
            <a-col span="12"></a-col>
        </a-row>

        <a-row style="margin-top: 20px">
            <a-col>
                <a-card title="Card title" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>