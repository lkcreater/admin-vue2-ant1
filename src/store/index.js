import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// LOAD MODULES STORE
import auth from '@/store/auth.store'

// EXPORT STORE
export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth
    }
})