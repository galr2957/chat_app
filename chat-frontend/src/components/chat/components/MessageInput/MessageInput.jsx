import React, {useState} from "react";
import { useSelector } from "react-redux";
import './MessageInput.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageInput = ({chat}) => {

    const [message, setMessage] = useState('')
    const [Image, setImage] = useState('')
    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)

    const handleMessage =(e) => {
        const value = e.target.value
        setMessage(value)

        // notify other users that this user is typing
    }

    const handleKeyDown = (e, imageUpload) => {
        if (e.Key === 'Enter') {
            sendMessage(imageUpload)
        }
    }

    const sendMessage = (imageUpload) => {
        if (message.length < 1 && !imageUpload) return

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUserId: user.id,
            toUserId: chat.User.map(user => user.id),
            chatId: chat.id,
            message: imageUpload? Image : message
        }

        setMessage('')
        setImage('')

        // SEND MESSAGE WITH SOCKET
    }
        
    return (
        <div id="input-container" >
            <div id="message-input">
                <input
                    type='text'
                    placeholder = 'Message...'
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon icon={['far', 'smile']} className="fa-icon"/>
            </div>
        </div>
    )
}

export default MessageInput