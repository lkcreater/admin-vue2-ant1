import categorys from '@/models/categorys';

export default {
    install(Vue, options) {
        Vue.prototype.$models =  {
            categorys: categorys()
        }        
    },
}