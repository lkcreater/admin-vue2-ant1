import http from "@/apis/api";

const UrlApi = `/api/media/upload`;

export function getUrl(file){
    return `${http.HOST_API_URL}/${file}`;
}

export function getUrlUpload(){
    return `${http.HOST_API_URL + UrlApi}/file`;
}

export function getUrlUploadImage(){
    return `${http.HOST_API_URL + UrlApi}/image`;
}

export function getUrlUploadImageGallery(){
    return `${http.HOST_API_URL + UrlApi}/gallery`;
}

export function upload(data){
    return http.Api('post', `${getUrlUpload()}`, data, true);
}

export function uploadImage(data){
    return http.Api('post', `${getUrlUploadImage()}`, data, true);
}
