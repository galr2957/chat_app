import React, {useEffect} from "react";
import {  useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar";
import { fetchChats } from "../../store/actions/chat";
import FriendList from "./components/friendList/friendList"
import Messenger from "./components/Messenger/Messenger"
import useSocket from "./hooks/socketConnect";
import './chat.scss'
import { useSelector } from "react-redux";

const Chat = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    useSocket(user, dispatch)

    return (
        <div id="chat-container">
           <Navbar/>
            <div id="chat-wrap">
                <FriendList/>
                <Messenger/>
            </div>
        
        </div>
    )

}

export default Chat;