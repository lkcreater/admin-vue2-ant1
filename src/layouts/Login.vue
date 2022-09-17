<template>
    <div id="layout-login">
        <router-view />
    </div>
</template>

<script>

    export default {
        components: {
		},
		data() {
			return {
			}
		},
    }
</script>

<style>
    #layout-login{
        position: absolute;
        padding-top: 120px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        /*
        background: rgb(225,172,255);
        background: linear-gradient(51deg, rgba(225,172,255,1) 0%, rgba(101,255,253,1) 100%);
        */

        background: rgb(255,255,255);
background: linear-gradient(125deg, rgba(255,255,255,1) 53%, rgba(24,144,255,1) 53%);
       
    }
</style>