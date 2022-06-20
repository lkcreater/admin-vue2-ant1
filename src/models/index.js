import categorys from '@/models/categorys';

const modelConfig = {
    api_host: 'http://localhost:3000/api'
};

export default {
    install(Vue, options) {
        Vue.prototype.$models =  {
            categorys: categorys(modelConfig)
        }        
    },
}