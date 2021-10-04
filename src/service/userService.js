import request from "../utils/request";

// const register = ({ name, username, password, priv_level}) => {
//     return request.request({
//         method: 'post',
//         url: '/user/register',
//         data: { name, username, password, priv_level }
//     })
// }

// TODO: 注册staff 
const registerStaff = () => {

}

// TODO: 注册Customer
const customerRegister = ({name, gender, dob, email, phone, password, address}) => {
    var dob_unix = new Date(dob).getTime()
    return request.request({
        method: 'post',
        url: '/customer/reg',
        data: {name, gender, dob_unix, email, phone, password, address}
    })
}

const customerLogin = ({ email, password }) => {
    return request.request({
        method: 'post',
        url: '/customer/auth',
        data: { email, password }
    })
}

const customerInfo = () => {
    return request.get('/customer/profile')
}

export default {
    customerRegister,
    customerLogin,
    customerInfo,
}