import AuthServices from '../../services/authServices';
import {  LOGIN , LOGOUT, UPDATE } from "../types/index";

export const Login = (params,dispatch) => {

    return AuthServices.login(params)
           .then((data) => {
               dispatch({type: LOGIN, payload: data})

            }).catch(err => {
                console.log(err);
            })
}

export const Register = (params,dispatch) => {

    return AuthServices.register(params)
           .then((data) => {
               dispatch({type: LOGIN, payload: data})

            }).catch(err => {
                console.log(err);
            })
}

export const UpdateProfile = (params,dispatch) => {

    return AuthServices.updateProfile(params)
           .then((data) => {
               dispatch({type: UPDATE, payload: data})

            }).catch(err => {
                throw err
            })
}

export const Logout = (dispatch) => {
    AuthServices.logout()   
    dispatch({type : LOGOUT})
        .catch(err => {
            console.log(err);
        })
    return 
        
}