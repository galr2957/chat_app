import React, {useState, useRef} from "react";
import { useSelector } from "react-redux";
import './MessageInput.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatService from "../../../../services/chatService";

const MessageInput = ({chat}) => {

    const [message, setMessage] = useState('massage...')
    const [Image, setImage] = useState('')
    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)

    const fileUpload = useRef()

    const handleMessage =(e) => {
        const value = e.target.value
        setMessage(value)

        // notify other users that this user is typing
    }

    const handleKeyDown = (e, imageUpload) => {
       
        if (e.key === 'Enter') {
            sendMessage(imageUpload)
        }
    }

    const sendMessage = (imageUpload) => {
        if (message.length < 1 && !imageUpload) return

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUser: user,
            toUserId: chat.users.map(user => user.id),
            chatId: chat.id,
            message: imageUpload? imageUpload.url : message
        }

        setMessage('')
        setImage('')

        socket.emit('message', msg)
    }

    const handleImageUpload = () => {
        const formData = new FormData()
        formData.append('id', chat.id)
        formData.append('image', Image)
        

        ChatService.uploadImage(formData)
        .then( image => {
            sendMessage(image)
        })
        .catch(err => console.log(err))

    }
        
    return (
        <div id="input-container" >
            <div id='image-upload-container'>
                <div>

                </div>
                <div id='image-upload'>
                    {
                        Image.name
                        ? <div id="image-details">
                            <p className="m-0"> {Image.name} </p>
                            <FontAwesomeIcon icon='upload' 
                                             className='fa-icon'
                                             onClick={handleImageUpload } />
                                             
                            <FontAwesomeIcon icon='times' 
                                             onClick={() => setImage('') } 
                                             className='fa-icon'/>
                            </div>
                        : null
                    }
                    <FontAwesomeIcon  icon={['far', 'image']} 
                                      className='fa-icon'
                                      onClick={() => fileUpload.current.click()}/>
                </div>

                <input  id="chat-image" 
                        ref={fileUpload} 
                        type='file' 
                        onChange={e => setImage(e.target.files[0])} />
            </div>
            <div id="message-input">
                <input
                    type='text'
                    placeholder = {message}
                    value={message}
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon icon={['far', 'smile']} className="fa-icon"/>
            </div>
        </div>
    )
}

export default MessageInput