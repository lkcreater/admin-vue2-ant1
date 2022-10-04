import * as MediaApi from '@/apis/mediaApi';
import moment from 'moment';

const state = { 
    username: '',
    token: '',
    data: '',
    isLogin: false,
    timestamp: 0,
    isLockScreen: false,

    //-- static setup
    timeLockScreen: 10, // min
    timeLogout: 30,
    keyHeader: 'x-access-token'    
};
const getters = { 
    isAuthen: (state) => state.isLogin,
    isLockScreen: (state) => state.isLockScreen,
    token: (state) => state.token,
    keyHeader: (state) => state.keyHeader,
    setHeader: (state) => {
        let header = {};
        header[state.keyHeader] = state.token;
        return header;
    },
    user: (state) => {
        let data = state.data;
        delete data.accessToken;

        return {
            fullname: `${data.firstname} ${data.surename}`,
            imageProfile: (data.image) ? MediaApi.getUrl(data.image?.url) : '',
            ...data
        }
    },
};
const actions = { 
};
const mutations = { 
    SET_VERTIFY_AUTH: function(state){
        if(state.timestamp === 0){
            state.isLogin = false;
            return;
        }
        
        const timenow = ((moment().valueOf() - state.timestamp)/1000)/60; // min
        //console.log('timenow', timenow);
        
        if(timenow > state.timeLogout){
            state.isLogin = false;
            state.isLockScreen = false;
            return;
        }else if(timenow > state.timeLockScreen){
            state.isLogin = false;
            state.isLockScreen = true;
            return;
        }else{
            state.isLockScreen = false;
            state.timestamp = moment().valueOf();
        }        
    },
    SET_LOGOUT: function(state) {
        state.username = '';
        state.token = '';
        state.data = '';
        state.isLogin = false;
        state.timestamp = 0;
        state.isLockScreen = false;
    },
    SET_AUTHEN: (state, object) => {
        state.username = object.username
        state.token = object.token
        state.data = object.data        
        state.isLogin = true;
        state.timestamp = moment().valueOf();
        state.isLockScreen = false;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}