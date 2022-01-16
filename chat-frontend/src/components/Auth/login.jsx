import React from "react";
import loginImage from '../../assets/images/login.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import authServices from "../../services/authServices";

import './login.scss'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault()

        //authServices.login({email, password}).then(res => console.log(res))
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="card-shadow">
                    <div className="image-section">
                        <img src={loginImage} alt='loginImg'/>
                    </div>

                    <div className="form-section">
                        <h2>
                            welcome back
                        </h2>
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input 
                                    onChange = {e => setEmail(e.target.value)}
                                    value = {email}
                                    required = 'required'
                                    type="email" 
                                    placeholder="Email"/>
                                </div>

                            <div className="input-field mb-2">
                                <input
                                    onChange = {e => setPassword(e.target.value)}
                                    value = {password}
                                    required = 'required'
                                    type="password" 
                                    placeholder="password"/>
                            </div>

                            <button>LOGIN</button>
                        </form>
                        <p>
                            <span style={{paddingRight: "5px"}}> 
                               don't have an acount?
                            </span>   
                            <Link to="/register">
                               Register
                            </Link>        
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;