import http from "@/apis/api";

const UrlApi = `/api/auth`;

export function signin(data){
    return http.Api('post', `${http.HOST_API_URL + UrlApi}/signin`, data);
}