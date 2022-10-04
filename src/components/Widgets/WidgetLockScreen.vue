<template>
    <div>
        <a-modal
            class="lk-widget-lockscreen"
            :dialog-style="{ top: '20%' }"
            :closable="false"
            :footer="null"
            :visible="visible">

            <div class="lk-lock-block-logout">
                <a-popconfirm
                    title="Are you sure Logout?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="confirmLogout">

                    <a-button type="primary" shape="circle">
                        <a-icon type="poweroff" />
                    </a-button>
                </a-popconfirm>
            </div>
            
            <h3 class="lk-lock-title">LOCK SCREEN</h3>

            <h4>{{ user.fullname }}</h4>
            <a-avatar :size="140" icon="user" :src="user.imageProfile || ''" />

            <a-form-model 
                ref="ruleFormLockScreen"
                :model="form"
                :rules="rules"
                @submit="onSubmit">

                <a-row style="margin-bottom: 20px;">
                    <a-col :span="12" :offset="6">
                        <a-form-model-item prop="password">
                            <a-input size="large" v-model="form.password" type="password" placeholder="Password">
                                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                            </a-input>
                        </a-form-model-item>

                        <a-button size="large">
                            <a-icon type="unlock" />
                            UNLOCK
                        </a-button>
                    </a-col>
                </a-row>
            </a-form-model>

		</a-modal>
    </div>
</template>

<script>
import * as Api from '@/apis/signInApi';
import { mapGetters, mapMutations } from "vuex";

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        ...mapGetters('auth', [
            'user',
            'isAuthen'
        ])
    },
    data() {
        return {   
            passErrCount: 0,         
            form: {
                password: ''   
            },
            rules: {
                password: [ { required: true, message: 'Please input Password', trigger: 'blur' } ],
            }         
        }
    },
    methods: {
        ...mapMutations({
			SET_AUTHEN : 'auth/SET_AUTHEN',
		}),
        confirmLogout() {
            this.$emit('update:visible', false);
            this.$router.replace({ path: '/sign-in' });
        },
        onSubmit(e){
            e.preventDefault();
            this.$refs.ruleFormLockScreen.validate( async valid => {
                if (!valid) {
                    this.$message.error('Please input Password');
                    return false;
                }

                const respone = await Api.signin({
                    username: this.user.username,
				    password: this.form.password,
                });

                if(respone.status == 401){
                    this.passErrCount = this.passErrCount + 1;
                    if(this.passErrCount >= 3){
                        this.confirmLogout();
                        return;
                    }                    
                }

				if(respone.status == 200){
                    this.SET_AUTHEN({
						username: respone.data.username,
						token: respone.data.accessToken,
						data: respone.data
					});

                    if(this.isAuthen){
                        this.resetForm();
                        this.$emit('update:visible', false);
                        return;
                    }
                }
                this.form.password = '';
            });
        },
        resetForm() {
            this.passErrCount = 0;
            this.form.password = '';
            this.$refs.ruleFormLockScreen.resetFields();
        },
    },
}
</script>