import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/auth';

    return {
        register: function(attrib){
            return axios.post(url_api + '/register', attrib);
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