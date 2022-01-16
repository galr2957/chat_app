import React from "react";
import loginImage from '../../assets/images/login.svg';
import { Link } from "react-router-dom";

import './login.scss'

const Login = () => {
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
                        <form>
                            <div className="input-field mb-1">
                                <input type="email" placeholder="Email"/>
                            </div>

                            <div className="input-field mb-2">
                                <input type="password" placeholder="password"/>
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