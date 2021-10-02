import request from "../utils/request";

const register = ({ name, username, password, priv_level}) => {
    return request.request({
        method: 'post',
        url: '/user/register',
        data: { name, username, password, priv_level }
    })
}

const login = ({ username, password }) => {
    return request.request({
        method: 'post',
        url: '/user/login',
        data: { username, password }
    })
}

const info = () => {
    return request.get('/user/profile')
}

export default {
    register,
    login,
    info,
}