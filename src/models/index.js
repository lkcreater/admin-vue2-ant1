import categorys from '@/models/categorys';
import posts from '@/models/posts';
import roles from '@/models/roles';
import auth from '@/models/auth';
import validate from '@/models/validate';
import user from '@/models/user';

const modelConfig = {
    host: 'http://localhost:3000',
    api_host: 'http://localhost:3000/api'
};

export default {
    install(Vue, options) {
        //console.log(Vue);
        Vue.prototype.$models =  {
            url: (url) => {
                return modelConfig.host + url
            },
            uploadfile: modelConfig.host + '/media/upload',
            categorys: categorys(modelConfig),
            post: posts(modelConfig),
            role: roles(modelConfig),
            auth: auth(modelConfig),
            user: user(modelConfig),
            validate: validate(modelConfig),
        }        
    },
}