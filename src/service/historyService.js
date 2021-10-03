import request from "../utils/request.js";
const getAllHistory = () => {
    return request.request({
        method: 'get',
        url: '/reserv/history'
    })
}
const delHistory = (id) => {
    return request.request({
        method:'DELETE',
        url:'/reserv/history?id='+id,
    })
}
export default {
    getAllHistory,
    delHistory
}