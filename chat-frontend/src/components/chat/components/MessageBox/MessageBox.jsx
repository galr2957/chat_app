import React, {useEffect,useRef} from "react";
import './MessageBox.scss'
import Message from "../Chatheader/Message/Message";
import { useSelector } from "react-redux";

const MessageBox = ({chat}) => {

    const user = useSelector(state => state.authReducer.user)
    const msgBox = useRef(null)
    const scrollBottom = useSelector(state => state.chatReducer.scrollBottom)

    const scrollManual = (value) => {
        msgBox.current.scrollTop= value
    }

    useEffect(() => {
            scrollManual(msgBox.current.scrollHeight)
        
    }, [scrollBottom])

    return (
        <div id="msg-box" ref={msgBox} >
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