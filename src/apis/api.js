import axios from "axios";
import Vue from "vue";
import router from '@/router';
import $store from '@/store';

const textErrorRender = (err) => {
    let text = '';
    if(err.response.data.message){
        text = err.response.data.message
    }else{
        text = `${err.code} : ${err.message}`
    }

    return text;
}

const getHeader = (auth) => {
    const headers = {};
    if(auth){
        const token = $store.getters['auth/token'];
        if(token == ''){
            router.replace({ path: '/sign-in' });
            return false;
        }
        headers[ $store.getters['auth/keyHeader'] ] = token;
    }
    return headers
}

const api = {
    HOST_API_URL: 'http://localhost:3000'
}

api.Api = async (method, url, data={}, auth=false, checkAuth=true) => {
    try {
        const header = getHeader(auth);       

        return await axios({
            method: method,
            url: url,
            data: data,
            headers: header
        });
    } catch (err) {
        if(checkAuth){
            if(err.response.status == 401){
                const code401 = err.response.data?.code || false;
                if(code401 === 'TOKEN_EXPIRED_ERR'){
                    router.replace({ path: '/sign-in' });
                }
            }        

            Vue.prototype.$notification['error']({
                message: `${err.response.statusText} (${err.response.status})`,
                description: textErrorRender(err),
            });
        }
        return err.response
    }
}

export default api;
