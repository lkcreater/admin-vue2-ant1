const name = '/l-store';

export default [
    {
		path: `${name}/show`,
		name: 'LStore',
		layout: "dashboard",
		component: () => import(/* webpackChunkName: "show" */ `@/modules/LpkStore/views/Show.vue`),
	},
	{
		path: `${name}/form`,
		name: 'LStore Form',
		layout: "dashboard",
		component: () => import(/* webpackChunkName: "form" */ `@/modules/LpkStore/views/StepForm.vue`),
	},
]