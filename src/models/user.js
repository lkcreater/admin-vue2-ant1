import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/user';

    return {
        all: function(){
            return axios.get(url_api + '/all');
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