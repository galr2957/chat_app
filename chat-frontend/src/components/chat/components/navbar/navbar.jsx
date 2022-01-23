import React , {useState, Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Logout as LogoutAuth, UpdateProfile} from "../../../../store/actions/auth";
import Modal from '../../../modal/modal'

import './navbar.scss';

const Navbar = () => {

    const user = useSelector((state)=> state.authReducer.user)
    const dispatch = useDispatch()

    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(true)

    const [firstName, setFirstNme] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.gender);
    const [avatar, setAvatar] = useState(user.avatar);

    const submitForm = (e) =>{ 
        e.preventDefault()

        const form = {firstName, lastName, email, gender, avatar}
        if (password.length) {form.password = password}
        
        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }

        UpdateProfile(formData, dispatch).then (() => setShowProfileModal(false))
    }

    return (
        <div id="navbar" className="card-shadow">
            <h2> chat.io</h2>
            <div onClick ={() => setShowProfileMenu(!showProfileMenu)} id='profile-menu'>
                <img height="40" width="40"  src = {`http://${user.avatar}`} alt='avatar'/>
                <p> {user.firstName}</p>
                <FontAwesomeIcon icon= 'caret-down' className="fa-icon"/>
                
                {
                    showProfileMenu 
                    ? <div id='profile-options'>
                            <p onClick={()=> setShowProfileModal(true)}> update profile </p>
                            <p onClick ={() => LogoutAuth(dispatch)}> logout </p>
                      </div>
                    : null
                }
                {
                    showProfileModal &&

                    <Modal click ={() => setShowProfileModal(false)}>
                        <Fragment key="header">
                            <h3 className="m-0"> update profile </h3> 
                        </Fragment>

                        <Fragment key="body">
                            <form>
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

                                <div className="input-field mb-2">
                                    <input 
                                        type="file" 
                                        onChange = {e => setAvatar(e.target.files[0])}/>
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key="footer">
                        <button onClick={submitForm} className="btn-success"> UPDATE </button>
                        </Fragment>
                    </Modal>

                }
                
            </div>
        </div>
    )
}

export default Navbar