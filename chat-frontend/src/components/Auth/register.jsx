import React from "react";
import registerImage from '../../assets/images/register.svg';
import { Link } from "react-router-dom";


import './register.scss'

const Register = () => {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="card-shadow">
                    <div className="image-section">
                        <img src={registerImage} alt='registerimage'/>
                    </div>

                    <div className="form-section">
                        <h2>
                            create an acount
                        </h2>
                        <form>
                            <div className="input-field mb-1">
                                <input type="email" placeholder="first name"/>
                            </div>

                            <div className="input-field mb-1">
                                <input type="email" placeholder="last name"/>
                            </div>

                            <div className="input-field mb-1">
                                <input type="email" placeholder="Email"/>
                            </div>

                            <div className="input-field mb-1">
                                <select placeholder="gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="input-field mb-2">
                                <input type="password" placeholder="password"/>
                            </div>

                            <button>REGISTER</button>
                        </form>

                        <p>
                            <span style={{paddingRight: "5px"}}> 
                                already have an acount? 
                            </span>   
                            <Link to="/login">
                                    LOGIN
                                </Link>        
                        </p> 
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;