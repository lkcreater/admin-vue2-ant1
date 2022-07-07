import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/post';

    return {
        findAll: function(){
            return axios.get(url_api);
        },
        create: function(attrib){
            const option = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            return axios.post(url_api, attrib, option);
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