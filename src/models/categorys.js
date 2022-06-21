import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/category';

    return {
        findAll: function(){
            return axios.get(url_api);
        },
        create: function(attrib){
            return axios.post(url_api, attrib);
        }
    }
};


export default model;