import AuthServices from '../../services/authServices';
export const LOGIN = 'LOGIN' 

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
