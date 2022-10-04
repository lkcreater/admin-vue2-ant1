import http from "@/apis/api";

const UrlApi = `/api/users`;

export function getMedialUrl(file){
    return `${http.HOST_API_URL}/${file}`;
}

export function getUrl(){
    return `${http.HOST_API_URL + UrlApi}`
}

export function validate(data){
    return http.Api('post', `${http.HOST_API_URL + UrlApi}/user-email`, data, true);
}

export function create(data){
    return http.Api('post', `${http.HOST_API_URL + UrlApi}`, data, true);
}

export function searchTag(data){
    return http.Api('get', `${http.HOST_API_URL + UrlApi}/search?title=${data}`, {}, true);
}

export function callMe(){
    return http.Api('get', `${http.HOST_API_URL + UrlApi}/me`, {}, true);
}
