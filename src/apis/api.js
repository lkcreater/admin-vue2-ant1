import axios from "axios";
import Vue from "vue";
import a from "vue";

var vm = new Vue()

const textErrorRender = (err) => {
    let text = '';
    if(err.response.data.message){
        text = err.response.data.message
    }else{
        text = `${err.code} : ${err.message}`
    }

    return text;
}

export const hostname = 'http://localhost:3000';

export async function Api(method, url, data={}, auth=false){
    const headers = {}

    if(auth){
        headers['auth'] = 'token';
    }

    try {
        const respone = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        });

        return respone;
    } catch (err) {
        Vue.prototype.$notification['error']({
            message: `${err.response.statusText} (${err.response.status})`,
            description: textErrorRender(err),
        });
        return err.response
    }
}

