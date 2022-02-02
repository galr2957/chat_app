import React, {Fragment, useState} from "react";
import './ChatHeader.scss'
import {userStatus} from '../../../../utils/helpers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ChatService from "../../../../services/chatService";
import Modal from '../../../modal/modal'

const ChatHeader = ({chat}) => {

    const [showChatOptiones, setshowChatOptiones] = useState(false)
    const [showAddFriendModal, setshowAddFriendModal] = useState(false)
    const [showLeaveChatModal, setshowLeaveChatModal] = useState(false)
    const [showDeleteChatModal, setshowDeleteChatModal] = useState(false)
    const [suggestions, setsuggestions] = useState([])

    const socket = useSelector(state => state.chatReducer.socket)

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
        .then(res => {
            setsuggestions(res)
        })
    }
    const addNewFriend = (id) => {
        ChatService.addFriendToGroupChat(id, chat.id)
        .then(data => {
            socket.emit('add-user-to-group',data)
            setshowAddFriendModal(false)
        })
        .catch(err => console.log(err))
    }

    const leaveChat = () => {
        ChatService.leaveCurrentChat(chat.id)
        .then( data => {
            socket.emit('leave-current-chat', data)
        })
        .catch( err => console.log(err))
    }


    return (
        <Fragment> 
            <div id="chatter">
                {chat.users.map (user =>{
                    return( 
                        <div className="chatter-info" key={user.id}>
                            <h3> {user.firstName} {user.lastName} </h3>
                            <div className="chatter-status"> 
                                 <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <FontAwesomeIcon 
            icon={['fas', 'ellipsis-v']} 
            className="fa-icon"
            onClick={() => setshowChatOptiones(!showChatOptiones)}
            />

            {
                showChatOptiones
                ? <div id="settings">
                    <div onClick={() => setshowAddFriendModal(true)}>
                        <FontAwesomeIcon icon= {['fas', 'user-plus']} className="fa-icon"/>
                        <p> Add user to chat </p>
                    </div>
                    {
                       chat.type ==="group"
                            ?  <div onClick={leaveChat()}>
                                <FontAwesomeIcon icon= {['fas', 'sign-out-alt']} className="fa-icon"/>
                                <p> Leave chat </p>
                                </div>
                            : null
                    }
                    
                    <div>
                        <FontAwesomeIcon icon= {['fas', 'trash']} className="fa-icon"/>
                        <p> Delete chat </p>
                    </div>
                  </div>
                :   null
            }
            {
                showAddFriendModal
                ? <Modal click={() => setshowAddFriendModal(false)}> 
                    <Fragment key='header'>
                        <h3 className="m-0">
                            add friend to group chat
                        </h3>
                    </Fragment>

                    <Fragment key='body'>
                        <p>
                            find friends by typing their name
                        </p>
                        <input  onChange={e => searchFriends(e)} 
                                type='text' 
                                placrholder='search...'/>
                        <div id="suggestions">
                            {
                                suggestions.map(user=> {
                                    return (
                                    <div key={user.id} className="suggestion">
                                        <p className="m-0"> {user.firstName} {user.lastName} </p> 
                                        <button onClick={() => addNewFriend(user.id)}>ADD</button>

                                    </div>)
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>

                :null
            }
        </Fragment>

    )
} 

export default ChatHeader