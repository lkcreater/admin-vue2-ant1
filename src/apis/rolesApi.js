import http from "@/apis/api";
import roles from "@/apis/initRoleItems";;

const UrlApi = `/api/role`;

export function getUrl(){
    return `${http.HOST_API_URL}${UrlApi}`;
}

export function create(data){
    return http.Api('post', `${http.HOST_API_URL + UrlApi}`, data, true);
}