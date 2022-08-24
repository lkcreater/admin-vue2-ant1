import categorys from '@/models/categorys';
import posts from '@/models/posts';
import roles from '@/models/roles';

const modelConfig = {
    host: 'http://localhost:3000',
    api_host: 'http://localhost:3000/api'
};

export default {
    install(Vue, options) {
        Vue.prototype.$models =  {
            url: (url) => {
                return modelConfig.host + url
            },
            categorys: categorys(modelConfig),
            post: posts(modelConfig),
            role: roles(modelConfig),
        }        
    },
}