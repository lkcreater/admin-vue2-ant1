import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from '@/store';

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/categorys',
		name: 'Categorys',
		layout: "dashboard",
		component: () => import('../views/Categorys.vue'),
	},
	{
		path: '/posts',
		name: 'Posts',
		layout: "dashboard",
		component: () => import('../views/Posts.vue'),
	},
	{
		path: '/posts/form',
		name: 'Form',
		layout: "dashboard",
		component: () => import('../views/PostFormInput.vue'),
	},
	{
		path: '/users',
		name: 'Users',
		layout: "dashboard",
		component: () => import('../views/Users/UsersTable.vue'),
	},
	{
		path: '/users/create',
		name: 'Create User',
		layout: "dashboard",
		component: () => import('../views/Users/CreateUser.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
		component: () => import('../views/Tables.vue'),
	},
	{
		path: '/test',
		name: 'Test',
		layout: "dashboard",
		component: () => import('../views/Test.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/rtl',
		name: 'RTL',
		layout: "dashboard-rtl",
		meta: {
			layoutClass: 'dashboard-rtl',
		},
		component: () => import('../views/RTL.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		layout: "login",
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		layout: "login",
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

router.beforeEach( async (to, from, next) => {
	// CHECK 404 PAGE
	if(to.matched[0].length > 0 && to.matched[0].path === '*'){
		return next();
	}

	//CHECK AUTHEN
	if(to.path !== '/sign-in'){
		$store.commit('auth/SET_VERTIFY_AUTH');
		if($store.getters['auth/isAuthen'] === false){

			if($store.getters['auth/isLockScreen'] === false){
				return next({ path : '/sign-in' });
			}			
		}				
	}

	next();
})

export default router
