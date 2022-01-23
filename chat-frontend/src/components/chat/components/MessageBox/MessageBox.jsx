import React from "react";
import './MessageBox.scss'
import Message from "../Chatheader/Message/Message";
import { useSelector } from "react-redux";

const MessageBox = ({chat}) => {

    const user = useSelector(state => state.authReducer.user)

    return (
        <div id="msg-box" >
            {
                chat.Messages.map((message, index) => {
                    return <Message
                              chat={chat}
                              message = {message}
                              index= {index}
                              user = {user}
                              key={message.id}/>
                })
            }

        </div>
    )
}

export default MessageBox