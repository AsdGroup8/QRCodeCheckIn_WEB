import axios from "axios";
import storageService from "@/service/storageService";
import router from '@/router'

const service = axios.create({
    baseURL: process.env["VUE_APP_BASE_URL"],
    timeout: 3000,
})

service.interceptors.request.use((config) => {
    Object.assign(config.headers, { Authorization: 'Bearer ' + storageService.get(storageService.USER_TOKEN) });
    return config;
}, err => {
    return Promise.reject(err);
})

service.interceptors.response.use(config => {
    const res = config.data;
    if (res.code != 0) {
        switch (res.code) {
            case 1: return Promise.reject("internal error");
            case 2: router.push({ path: '/login' }); return Promise.reject("没有登录");
            case 3: router.push({ path: "/login" }); return Promise.reject("没有登录");
            case 4: return Promise.reject("invalid input format")
            case 5: return Promise.reject("invalid parameters")
            default: return Promise.reject("Unhandle Error!");
        }
    } else {
        return res;
    }
}, error => {
    return Promise.reject(error);
})

export default service;