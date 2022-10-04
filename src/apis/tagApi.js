import http from "@/apis/api";

const UrlApi = `/api/tag`;

export function showAll(){
    return http.Api('get', `${http.HOST_API_URL + UrlApi}/all`, {}, true);
}

export function searchTag(data){
    return http.Api('get', `${http.HOST_API_URL + UrlApi}/search?title=${data}`, {}, true);
}
