import http from "@/apis/api";

const UrlApi = `/api/auth`;

export function sync(){
    return http.Api('post', `${http.HOST_API_URL + UrlApi}/sync`, {}, true, false);
}