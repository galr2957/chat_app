import {  LOGIN , LOGOUT, UPDATE } from "../types/index";

const initialState = {
    // user: JSON.parse(localStorage.getItem('user')) || {},
    // token: localStorage.getItem('token') || '',
    // isLoggedIn: !!localStorage.getItem('token')

    user:  {},
    token:  '',
    isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
    
    const { type, payload } = action

    switch(type) {
        case LOGIN: 
            return {
                ...state,
                user: payload,
                token: payload.token,
                IsLoggedIn: true
            }
        case UPDATE: 
            return {
                ...state,
                user: payload
            }
        case LOGOUT: 
            return {
                ...state,
                user: {},
                token: '',
                IsLoggedIn: false
            }
         default: 
            return state
    }
}

export default authReducer;