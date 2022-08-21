import axios from "axios";

const model = function(config){
    const url_api = config.api_host + '/post';

    return {
        findAll: (page) => {
            return axios.get(url_api, { 
                params: { 
                    page: page 
                } 
            });
        },
        create: function(attrib){
            const option = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            return axios.post(url_api, attrib, option);
        },
        update: (id, attrib) => {
            const option = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            return axios.put(url_api + '/' + id, attrib, option);
        },
        active: (id, attrib) => {
            return axios.put(url_api + '/active/' + id, attrib);
        },
        delete: function(id){
            return axios.delete(url_api + '/' + id);
        }
    }
};


export default model;