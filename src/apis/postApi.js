import http from "@/apis/api";

const UrlApi = `/api/post`;

export function getUrl(){
    return `${http.HOST_API_URL}${UrlApi}`;
}

export function add(data){
    return http.Api('post', http.HOST_API_URL + UrlApi, data, true);
}

export function update(id, data){
    return http.Api('put', `${http.HOST_API_URL + UrlApi}/${id}`, data, true);
}

export function findAll(data){
    return http.Api('get', http.HOST_API_URL + UrlApi, data, true);
}

export function findList(){
    return http.Api('get', `${http.HOST_API_URL + UrlApi}/list`, {}, true);
}

export function del(id){
    return http.Api('delete', `${http.HOST_API_URL + UrlApi}/${id}`, {}, true);
}