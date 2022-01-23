import API from './api';

const AuthServices = {
    login: (data) => {
        return API.post('/login', data)
               .then(({data}) => {
               setHeadersAndStorage(data, data.token)
                    return data
               })
               .catch(err => {console.log('auth service err', err); 
                    throw err
               })
    },
    register: (data) => {
     return API.post('/register', data)
            .then(({data}) => {
               setHeadersAndStorage(data, data.token)
                 return data
            })
            .catch(err => {console.log('auth service err', err); 
                 throw err
            })
     },
     updateProfile: (data) => {
          const headers = {
               headers: {'content-type' : 'application/x-www-form-urlencoded'}
          }
          return API.post('/users/update', data, headers)
                 .then(({data}) => {
                    localStorage.setItem('user' , JSON.stringify(data) )
                      return data
                 })
                 .catch(err => {console.log('auth service err', err); 
                      throw err
                 })
     },
     logout : () => {
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          return API.defaults.headers['Authorization']= ``
     }
}

const setHeadersAndStorage = (user, token) => {
     API.defaults.headers['Authorization']= `bearer ${token}`
     localStorage.setItem('user' , JSON.stringify(user) )
     localStorage.setItem('token' , token)
}

export default AuthServices