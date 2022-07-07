import categorys from '@/models/categorys';
import posts from '@/models/posts';

const modelConfig = {
    api_host: 'http://localhost:3000/api'
};

export default {
    install(Vue, options) {
        Vue.prototype.$models =  {
            categorys: categorys(modelConfig),
            post: posts(modelConfig),
        }        
    },
}