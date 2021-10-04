import request from "../utils/request.js";

const createReservation = ({ movie_id, starttime }) => {
    return request.request({
        method: 'post',
        url: '/customer/reserv',
        data: { movie_id, starttime }
    })
}

const getAllHistory = () => {
    return request.request({
        method: 'get',
        url: '/customer/reserv/history'
    })
}
const delHistory = (id) => {
    return request.request({
        method:'DELETE',
        url:'/customer/reserv/history?id='+id,
    })
}

export default {
    createReservation,
    getAllHistory,
    delHistory
}