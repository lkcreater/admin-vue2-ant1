import { Api, hostname } from "./api";

export function signin(data){
    return Api('post', `${hostname}/api/auth/signin`, data);
}