import axios from "axios";

const model = function(config){
    return {
        findAll: function(){
            return axios.get(config.api_host + '/category');
        }
    }
};


export default model;