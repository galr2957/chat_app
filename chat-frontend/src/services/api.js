import axios from "axios";
import store from "../store";
import { Logout } from "../store/actions/auth";

const API = axios.create({
    baseURL: 'https://gals-chat-app-api.herokuapp.com',
    headers : {
        'Accept' : 'application/Json',
        'Authorization' : `bearer ${localStorage.getItem('token') || ''}`
    }
})

API.interceptors.response.use(
    res => {
        return res
    },
    err => {
        if (err.response.status !== 401) {
            throw err
        }

        if (typeof err.response.data.error.name !== 'undefined') {
            if (err.response.data.error.name === 'TokenExpiredError') {
                store.dispatch(Logout)
                throw err
            }
        }
    }
)

export default API