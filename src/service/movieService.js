import request from "../utils/request.js";

const getAllMovie = () => {
    return request.request({
        method: 'get',
        url: '/app/movie'
    })
}

export default {
    getAllMovie
}