import API from './api';

const authServices = {
    login: (data) => {
        return API.post('/login', data)
               .then(({data}) => {
                    API.defaults.headers['Authorization']= `bearer ${data.token}`
                    return data
               })
               .catch(err => {console.log('auth service err', err); 
                    throw err
               })
    }
}

export default authServices