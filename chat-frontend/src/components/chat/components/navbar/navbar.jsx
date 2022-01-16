import React from "react";
import { useSelector } from "react-redux";

import './navbar.scss';

const Navbar = () => {

    const user = useSelector((state)=> state.authReducer.user)
    return (
        <div id="navbar">
            <h2> chat.io</h2>
            <div id='profile-menu'>
                <img src='' alt='avatar'/>
                <p> {user.firstName}</p>
            </div>
        </div>
    )
}

export default Navbar