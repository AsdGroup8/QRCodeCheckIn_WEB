import request from "../utils/request.js";

const createReservation = ({ movie_id, starttime }) => {
    return request.request({
        method: 'post',
        url: '/customer/reserv',
        data: { movie_id, starttime }
    })
}

export default {
    createReservation
}