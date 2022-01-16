export const LOGIN = 'LOGIN'
import authServices from "../../services/authServices"

export const login = (params) => dispatch => {
    return authServices.login(params)
           .then(data => {
               console.log(data)
               dispatch({type: LOGIN, payload: data})

            }).catch(err => {
                console.log(err);
            })

}