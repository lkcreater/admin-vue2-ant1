import { Api, hostname } from "./api";

const UrlApi = `${hostname}/api/category`;

export const urlFindAll = '';

export function getUrl(){
    return UrlApi;
}

export function add(data){
    return Api('post', UrlApi, data);
}

export function update(id, data){
    return Api('put', `${UrlApi}/${id}`, data);
}

export function findAll(data){
    return Api('get', UrlApi, data);
}

export function findList(){
    return Api('get', `${UrlApi}/list`);
}

export function del(id){
    return Api('delete', `${UrlApi}/${id}`);
}