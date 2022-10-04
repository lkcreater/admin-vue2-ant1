<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form signin-form">
				<h1 class="mb-15">Sign In</h1>
				<h5 class="font-regular text-muted">Enter your username and password to sign in</h5>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Username" :colon="false">
						<a-input v-model="model.username" placeholder="Username">
							<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.45)" />						
						</a-input>
					</a-form-item>

					<a-form-item class="mb-5" label="Password" :colon="false">
						<a-input type="password" v-model="model.password" placeholder="Password" >
							<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.45)" />						
						</a-input>
					</a-form-item>

					<a-form-item class="mb-10">
    					<a-switch v-model="model.rememberMe" /> Remember Me
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							SIGN IN
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p v-if="visibleSignUpLink" class="font-semibold text-muted">Don't have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign Up</router-link></p>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img col-slider" >
				<a-carousel autoplay effect="fade">
					<div><img src="images/slide/5.png" alt=""></div>
					<div><img src="images/slide/2.png" alt=""></div>
					<div><img src="images/slide/3.png" alt=""></div>
					<div><img src="images/slide/6.png" alt=""></div>
				</a-carousel>
				
			</a-col>
			<!-- Sign In Image Column -->

		</a-row>
	</div>
</template>

<script>
import local from '@/plugins/LocalStorageDB';
import * as Api from '@/apis/signInApi';
import { mapGetters, mapMutations } from "vuex";

export default ({
	data() {
		return {			
			visibleSignUpLink: false,			
			model:{
				username: '',
				password: '',
				rememberMe: false,
			}
		}
	},
	computed: {
		checkForcus() {			
			return (this.model.rememberMe == true) ? 'true' : 'false';
		},
		...mapGetters({
			isAuthen : 'auth/isAuthen', 
		}),
	},
 	async mounted () {
		this.SET_LOGOUT();
		this.loadRemember();
	},
	methods: {
		...mapMutations({
			SET_AUTHEN : 'auth/SET_AUTHEN',
			SET_LOGOUT : 'auth/SET_LOGOUT'
		}),
	 	async handleSubmit(e) {
			e.preventDefault();
			if(this.validate()){
				const respone = await Api.signin(this.model);
				if(respone.status == 200){
					if(this.model.rememberMe){
						this.setRemember();
					}else{
						this.removeRemember();
					}

					// set local storage
					local.setupAuthen(this.model.username, respone.data.accessToken);

					this.SET_AUTHEN({
						username: this.model.username,
						token: respone.data.accessToken,
						data: respone.data
					});

					if(this.isAuthen){
						this.$router.replace({ path: '/' })
					}
				}
			}			
		},
		validate(){
			let valid = [];			
			Object.entries(this.model).forEach(([key, value]) => {
				if(value.length === 0){
					valid.push(`This field ${key.toLocaleUpperCase()} is required`);
				}
			});

			if(valid.length === 0){
				return true;
			}else{
				this.$notification['error']({
					message: 'Notification!',
					description: function(h){
						return h('ul', valid.map(ele => h('li', ele)));
					},
				});
				return false;
			}
		},
		setRemember(){
			if(this.model.username.length > 0){
				local.setupRemember(this.model.username);			
			}
		},
		removeRemember(){
			local.removeRemember();
		},
		loadRemember(){
			const { username, rememberMe } = local.loadRemember();			
			
			this.model.username = username;
			this.model.rememberMe = rememberMe;
		}
	},
})
</script>

<style>
	@keyframes slide-left {
		from {left: -200px; opacity: 0;}
		to {left: 0px; opacity: 1;}
	}
	@keyframes slide-right {
		from {right: -200px; opacity: 0;}
		to {right: 0px; opacity: 1;}
	}

	.signin-form{
		background-color: #ffffff;
		padding: 25px !important;
		animation-name: slide-left;
  		animation-duration: 1s;
	}
	.col-slider{
		animation-name: slide-right;
  		animation-duration: 1s;
	}
	
</style>