import React, {useState, useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import './MessageInput.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatService from "../../../../services/chatService";
import {Picker} from 'emoji-mart'
import { incrementScroll } from "../../../../store/actions/chat";
import 'emoji-mart/css/emoji-mart.css'


const MessageInput = ({chat}) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [Image, setImage] = useState('')
    const [showEmojiPicker,setshowEmojiPicker] = useState(false)
    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)
    const newMessage = useSelector(state => state.chatReducer.newMessage)

    const [showNewMsgNotif, setshowNewMsgNotif] = useState(false)
    const fileUpload = useRef()
    const msgInput = useRef()

    const handleMessage =(e) => {
        const value = e.target.value
        setMessage(value)

        const receiver = {
            chatId: chat.id,
            fromUser: user,
            toUserId: chat.users.map(user => user.id)
        }

        if (value.length === 1) {
            receiver.typing = true
            socket.emit('typing', receiver)
        }
        if (value.length === 0) {
            receiver.typing = false
            socket.emit('typing', receiver)
        }

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
        setshowEmojiPicker(false)

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

    const selectEmoji = (emoji) => {
        const startingPosition = msgInput.current.selectionStart
        const endPosition = msgInput.current.selectionEnd
        const emojiLength = emoji.native.length
        const value = msgInput.current.value
        setMessage(value.substring(0, startingPosition) + emoji.native + value.substring(endPosition, value.length))
        msgInput.current.focus()
        msgInput.current.selectionEnd = endPosition + emojiLength
    }

    useEffect(() => {
        if (!newMessage.seen && newMessage.chatId === chat.id) {
            const msgBox = document.getElementById('msg-box')
            if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
                incrementScroll(dispatch)
            } else {
                setshowNewMsgNotif(true)
            }
        } else {
            setshowNewMsgNotif(false)
        }
    },[newMessage, dispatch])

    const showNewMessage = () => {
        incrementScroll(dispatch)
        setshowNewMsgNotif(false)
    }
        
    return (
        <div id="input-container" >
            <div id='image-upload-container'>
                <div>
                    {
                        showNewMsgNotif
                        ? <div id="message-notification" onClick={showNewMessage}>
                            <FontAwesomeIcon icon="bell" className='fa-icon' />
                            <p className = 'm-0'> new message </p>
                        </div>
                        : null
                    }

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
                    ref={msgInput}
                    type='text'
                    placeholder = 'message...'
                    value={message}
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon 
                    icon={['far', 'smile']} 
                    onClick={() => setshowEmojiPicker(!showEmojiPicker)}
                    className="fa-icon"/>
            </div>
            {
                showEmojiPicker
                ? <Picker
                     title="PICK YOUR EMOJI"
                     emoji="point_up"
                     style={{position: 'absolute', bottom: '20px', right: '20px'}}
                     onSelect={selectEmoji}/>
                : null

            }
        </div>
    )
}

export default MessageInput