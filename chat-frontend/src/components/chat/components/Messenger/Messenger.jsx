import React from "react";
import './Messenger.scss'
import { useSelector } from "react-redux";
import MessageInput from "../MessageInput/MessageInput";
import MessageBox from "../MessageBox/MessageBox";
import ChatHeader from "../Chatheader/ChatHeader";

const Messenger = () => {

    const chat = useSelector(state => state.chatReducer.currentChat)

    const activeChat = () => {
        return Object.keys(chat).length > 0
    }
    return (
        <div id="messenger" className="shadow-light">
            {
                activeChat()
                    ? <div id="messenger-wrap">
                        <ChatHeader chat={chat}/>
                        <hr/>
                        <MessageBox chat={chat}/>
                        <MessageInput chat={chat}/>
                    </div>
                    : <p> open an <b>existing chat</b> or add <b> friends </b> to chat with</p>
            }
        </div>
    )
}

export default Messenger