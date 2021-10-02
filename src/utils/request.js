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
            case 1: return Promise.reject("内部错误");
            case 70: return res;
            case 10: return Promise.reject("反序列化失败");
            case 20: router.push({ path: '/login' }); return Promise.reject("没有登录");
            case 30: return Promise.reject("Entity不存在");
            case 40: return Promise.reject("数据不符合要求");
            case 50: router.push({ path: "/login" }); return Promise.reject("没有登录");
            case 51: return Promise.reject("用户权限等级太低");
            case 60: return Promise.reject("登录信息错误");
            case 80: return Promise.reject("数据与模型无法绑定");
            case 90: return Promise.reject("加密失败");
            default: return Promise.reject("Unhandle Error!");
        }
    } else {
        return res;
    }
}, error => {
    return Promise.reject(error);
})

export default service;