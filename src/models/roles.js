import axios from "axios";
const roles = [
    {   
        role: 'category',
        desc: '',
        items: ['view', 'create', 'update', 'delete']
    },
    {   
        role: 'post',
        desc: '',
        items: ['view', 'create', 'update', 'delete']
    },
];

const model = (config) => {
    const url_api = config.api_host + '/role';

    return {
        getList : () => {
            return roles;
        },
        findAll: function(){
            return axios.get(url_api);
        },
        create: function(attrib){
            return axios.post(url_api, attrib);
        },
        update: function(id, attrib){
            return axios.put(url_api + '/' + id, attrib);
        },
        delete: function(id){
            return axios.delete(url_api + '/' + id, attrib);
        }
    }
};


export default model;