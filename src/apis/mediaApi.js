import { Api, hostname } from "./api";

const UrlApi = `${hostname}`;

export function getUrl(file){
    return `${UrlApi}/${file}`;
}

export function getUrlUpload(){
    return `${UrlApi}/api/media/upload/file`;
}

export function getUrlUploadImage(){
    return `${UrlApi}/api/media/upload/image`;
}

export function getUrlUploadImageGallery(){
    return `${UrlApi}/api/media/upload/gallery`;
}

export function upload(data){
    return Api('post', `${getUrlUpload()}`, data);
}

export function uploadImage(data){
    return Api('post', `${getUrlUploadImage()}`, data);
}
