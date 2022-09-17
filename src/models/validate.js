import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/validate';

    return {
        usernameOrEmail: function(attrib){
            return axios.post(url_api + '/username_or_email', attrib);
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