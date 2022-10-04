<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app" @click="clickOutSide">
		<component :is="layout">
			<router-view />
		</component>
		<WidgetLockScreen :visible.sync="visible" />
	</div>
</template>

<script>
import WidgetLockScreen from '@/components/Widgets/WidgetLockScreen';

export default ({
	components: {
		WidgetLockScreen,
	},
	computed: {
		// Sets components name based on current route's specified layout, defaults to
		// <layout-default></layout-default> component.
		layout() {
			return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
		}
	},
	data() {
		return {
			visible: false
		}
	},
	methods: {
		clickOutSide() {
			const except = ['/sign-in', '*'];
			if(!except.includes(this.$route.path)){
				this.$store.commit('auth/SET_VERTIFY_AUTH');
				this.visible = this.$store.getters['auth/isLockScreen']
			}
		}
	},
})
	
</script>

<style lang="scss">
</style>