import API from './api';

const AuthServices = {
    login: (data) => {
        return API.post('/login', data)
               .then(({data}) => {
                    API.defaults.headers['Authorization']= `bearer ${data.token}`
                    return data
               })
               .catch(err => {console.log('auth service err', err); 
                    throw err
               })
    },
    register: (data) => {
     return API.post('/register', data)
            .then(({data}) => {
                 API.defaults.headers['Authorization']= `bearer ${data.token}`
                 return data
            })
            .catch(err => {console.log('auth service err', err); 
                 throw err
            })
 }
}

export default AuthServices