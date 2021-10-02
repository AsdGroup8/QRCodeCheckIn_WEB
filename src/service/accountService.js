import request from "../utils/request.js";

const get_all = () => {
    return request.request({
        method: 'get',
        url: '/account',
    })
}

const get_detail = (id) => {
    return request.request({
        method: 'get',
        url: '/account/detail',
        params: {
            id
        }
    })
}

const add_account = (account) => {
    return request.request({
        method: 'post',
        url: '/account/add',
        data: JSON.stringify(account)
    })
}

const update_account = (account) => {
    return request.request({
        method: 'PUT',
        url: '/account',
        data: JSON.stringify(account)
    })
}

const get_credit_elo = (id) => {
    return request.request({
        method: 'GET',
        url: '/account/credit_elo',
        params: {
            id: id
        }
    })
}
const delete_account = (id) => {
    return request.request({
        method: 'DELETE',
        url: '/account',
        params: {
            id: id
        }
    })
}

export default {
    get_all, get_detail, add_account, update_account, get_credit_elo, delete_account
}