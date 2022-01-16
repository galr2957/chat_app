import React, {useState} from "react";
import registerImage from '../../assets/images/register.svg';
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {Register as registerAuth} from "../../store/actions/auth";



import './register.scss'

const Register = () => {

    const dispatch =useDispatch()
    const navigate = useNavigate()

    const [firstName, setFirstNme] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('MALE');

    const submitForm = (e) => {
        e.preventDefault()
        registerAuth({firstName, lastName, email, password,gender}, dispatch)
                 .then(() => navigate('/'))
    }

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
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                            <input 
                                    onChange = {e => setFirstNme(e.target.value)}
                                    value = {firstName}
                                    required = 'required'
                                    type="text" 
                                    placeholder="FIRST NAME"/>
                            </div>

                            <div className="input-field mb-1">
                                <input 
                                     type="text" 
                                     placeholder="LAST NAME"
                                     required = 'required'
                                     onChange = {e => setLastName(e.target.value)}
                                     value = {lastName}  />
                            </div>

                            <div className="input-field mb-1">
                                <input  
                                   onChange = {e => setEmail(e.target.value)}
                                    value = {email}
                                    required = 'required'
                                    type="email" 
                                    placeholder="Email"/>
                            </div>

                            <div className="input-field mb-1">
                                <select 
                                    placeholder="gender"
                                    onChange = {e => setGender(e.target.value)}
                                    value = {gender}
                                    required = 'required'>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="input-field mb-2">
                                <input 
                                    type="password" 
                                    placeholder="PASSWORD"
                                    onChange = {e => setPassword(e.target.value)}
                                    required = 'required'/>
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